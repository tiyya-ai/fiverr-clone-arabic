import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO, Socket } from 'socket.io'
import { prisma } from './prisma'
import jwt from 'jsonwebtoken'

export type NextApiResponseServerIO = {
  socket: {
    server: NetServer & {
      io: ServerIO
    }
  }
}

interface AuthenticatedSocket extends Socket {
  userId?: string
  username?: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export function initializeSocket(server: NetServer) {
  if (!(server as any).io) {
    console.log('Initializing Socket.IO server...')
    
    const io = new ServerIO(server, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    })

    // Authentication middleware
    io.use(async (socket: any, next) => {
      try {
        const token = socket.handshake.auth.token
        if (!token) {
          return next(new Error('Authentication error'))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: { id: true, username: true, fullName: true, avatar: true }
        })

        if (!user) {
          return next(new Error('User not found'))
        }

        socket.userId = user.id
        socket.username = user.username
        socket.user = user
        next()
      } catch (error) {
        next(new Error('Authentication error'))
      }
    })

    io.on('connection', (socket: any) => {
      console.log(`User ${socket.username} connected`)

      // Update user online status
      if (socket.userId) {
        prisma.user.update({
          where: { id: socket.userId },
          data: { isOnline: true, lastSeen: new Date() }
        }).catch(console.error)
      }

      // Join user to their personal room
      socket.join(`user_${socket.userId}`)

      // Handle joining conversation rooms
      socket.on('join_conversation', async (conversationId: string) => {
        try {
          // Verify user is part of this conversation
          const conversation = await prisma.message.findFirst({
            where: {
              OR: [
                { fromUserId: socket.userId },
                { toUserId: socket.userId }
              ]
            }
          })

          if (conversation) {
            socket.join(`conversation_${conversationId}`)
            console.log(`User ${socket.username} joined conversation ${conversationId}`)
          }
        } catch (error) {
          console.error('Error joining conversation:', error)
        }
      })

      // Handle sending messages
      socket.on('send_message', async (data: {
        toUserId: string
        content: string
        orderId?: string
      }) => {
        try {
          const { toUserId, content, orderId } = data

          // Create message in database
          const message = await prisma.message.create({
            data: {
              fromUserId: socket.userId,
              toUserId,
              content,
              orderId,
              isRead: false
            },
            include: {
              fromUser: {
                select: {
                  id: true,
                  username: true,
                  fullName: true,
                  avatar: true
                }
              },
              toUser: {
                select: {
                  id: true,
                  username: true,
                  fullName: true,
                  avatar: true
                }
              }
            }
          })

          // Send to conversation room
          const roomName = `conversation_${socket.userId}_${toUserId}`
          io.to(roomName).emit('new_message', message)

          // Send notification to receiver
          io.to(`user_${toUserId}`).emit('message_notification', {
            messageId: message.id,
            fromUserId: socket.userId,
            senderName: socket.user.fullName,
            content: content.substring(0, 50) + (content.length > 50 ? '...' : '')
          })

          // Acknowledge to sender
          socket.emit('message_sent', { messageId: message.id })

        } catch (error) {
          console.error('Error sending message:', error)
          socket.emit('message_error', { error: 'Failed to send message' })
        }
      })

      // Handle message read status
      socket.on('mark_messages_read', async (fromUserId: string) => {
        try {
          await prisma.message.updateMany({
            where: {
              fromUserId,
              toUserId: socket.userId,
              isRead: false
            },
            data: { isRead: true }
          })

          // Notify sender that messages were read
          io.to(`conversation_${fromUserId}_${socket.userId}`).emit('messages_read', {
            readBy: socket.userId
          })
        } catch (error) {
          console.error('Error marking messages as read:', error)
        }
      })

      // Handle typing indicators
      socket.on('typing_start', (conversationId: string) => {
        socket.to(`conversation_${conversationId}`).emit('user_typing', {
          userId: socket.userId,
          username: socket.username
        })
      })

      socket.on('typing_stop', (conversationId: string) => {
        socket.to(`conversation_${conversationId}`).emit('user_stopped_typing', {
          userId: socket.userId
        })
      })

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User ${socket.username} disconnected`)
        
        // Update user offline status
        if (socket.userId) {
          prisma.user.update({
            where: { id: socket.userId },
            data: { isOnline: false, lastSeen: new Date() }
          }).catch(console.error)
        }
      })
    })

    ;(server as any).io = io
  }
  
  return (server as any).io
}