import { createUploadthing, type FileRouter } from "uploadthing/next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const f = createUploadthing()

export const ourFileRouter = {
  // Avatar upload for user profiles
  avatarUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) throw new Error("يجب تسجيل الدخول أولاً")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Avatar upload complete for userId:", metadata.userId)
      console.log("File URL:", file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Service images upload
  serviceImageUploader: f({ 
    image: { maxFileSize: "8MB", maxFileCount: 5 } 
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) throw new Error("يجب تسجيل الدخول أولاً")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Service image upload complete for userId:", metadata.userId)
      console.log("File URL:", file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Portfolio files upload
  portfolioUploader: f({ 
    image: { maxFileSize: "8MB", maxFileCount: 10 },
    video: { maxFileSize: "32MB", maxFileCount: 3 },
    pdf: { maxFileSize: "16MB", maxFileCount: 5 }
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) throw new Error("يجب تسجيل الدخول أولاً")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Portfolio upload complete for userId:", metadata.userId)
      console.log("File URL:", file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Order delivery files upload
  deliveryUploader: f({ 
    image: { maxFileSize: "8MB", maxFileCount: 10 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
    pdf: { maxFileSize: "32MB", maxFileCount: 10 }
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) throw new Error("يجب تسجيل الدخول أولاً")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Delivery file upload complete for userId:", metadata.userId)
      console.log("File URL:", file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Message attachments upload
  messageAttachmentUploader: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    pdf: { maxFileSize: "8MB", maxFileCount: 3 }
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) throw new Error("يجب تسجيل الدخول أولاً")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Message attachment upload complete for userId:", metadata.userId)
      console.log("File URL:", file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // Certification documents upload
  certificationUploader: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "8MB", maxFileCount: 1 }
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) throw new Error("يجب تسجيل الدخول أولاً")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Certification upload complete for userId:", metadata.userId)
      console.log("File URL:", file.url)
      return { uploadedBy: metadata.userId, url: file.url }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter