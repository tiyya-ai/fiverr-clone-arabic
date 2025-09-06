import React from 'react';
const { useState, useEffect } = React;
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar,
  FiDollarSign,
  FiShield,
  FiEdit,
  FiTrash2,
  FiEye,
  FiLock,
  FiUnlock,
  FiUserPlus,
  FiDownload,
  FiUpload
} from 'react-icons/fi';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: ''
  });

  // Mock user data
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@example.com',
        phone: '+1 (555) 123-4567',
        role: 'seller',
        status: 'active',
        joinDate: '2023-01-15',
        lastLogin: '2023-12-15 10:30 AM',
        location: 'New York, USA',
        totalEarnings: 12450,
        totalSpent: 0,
        completedOrders: 89,
        rating: 4.9,
        avatar: 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/4c23b8a8-8d0e-4f8e-9e7f-8c5b4a2d1e3f/JPEG_20210615_123456_123456789.jpg',
        verified: true,
        twoFactorEnabled: true,
        permissions: ['create_gig', 'edit_gig', 'delete_gig', 'respond_to_orders']
      },
      {
        id: 2,
        firstName: 'Mike',
        lastName: 'Chen',
        email: 'mike@example.com',
        phone: '+1 (555) 234-5678',
        role: 'buyer',
        status: 'active',
        joinDate: '2023-02-20',
        lastLogin: '2023-12-14 3:45 PM',
        location: 'California, USA',
        totalEarnings: 0,
        totalSpent: 3200,
        completedOrders: 15,
        rating: 4.7,
        avatar: 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/5d34c9b9-9e1f-5g9f-af8g-9d6c5b3e2f4g/JPEG_20210620_134567_234567890.jpg',
        verified: true,
        twoFactorEnabled: false,
        permissions: ['place_orders', 'leave_reviews', 'contact_sellers']
      },
      {
        id: 3,
        firstName: 'Emma',
        lastName: 'Davis',
        email: 'emma@example.com',
        phone: '+1 (555) 345-6789',
        role: 'seller',
        status: 'suspended',
        joinDate: '2023-03-10',
        lastLogin: '2023-12-10 8:20 AM',
        location: 'Texas, USA',
        totalEarnings: 8900,
        totalSpent: 450,
        completedOrders: 67,
        rating: 4.8,
        avatar: 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/6e45daca-af2g-6h0g-bg9h-ae7d6c4f3g5h/JPEG_20210625_145678_345678901.jpg',
        verified: false,
        twoFactorEnabled: true,
        permissions: ['create_gig', 'edit_gig']
      },
      {
        id: 4,
        firstName: 'Alex',
        lastName: 'Rodriguez',
        email: 'alex@example.com',
        phone: '+1 (555) 456-7890',
        role: 'admin',
        status: 'active',
        joinDate: '2022-12-01',
        lastLogin: '2023-12-15 11:15 AM',
        location: 'Florida, USA',
        totalEarnings: 0,
        totalSpent: 0,
        completedOrders: 0,
        rating: 5.0,
        avatar: 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/7f56ebdb-bg3h-7i1h-ch0i-bf8e7d5g4h6i/JPEG_20210630_156789_456789012.jpg',
        verified: true,
        twoFactorEnabled: true,
        permissions: ['manage_users', 'manage_services', 'manage_orders', 'view_analytics', 'system_settings']
      }
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const matchesSearch = filters.search === '' || 
      user.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'activate':
            return { ...user, status: 'active' };
          case 'suspend':
            return { ...user, status: 'suspended' };
          case 'ban':
            return { ...user, status: 'banned' };
          case 'verify':
            return { ...user, verified: true };
          case 'unverify':
            return { ...user, verified: false };
          default:
            return user;
        }
      }
      return user;
    }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const UserModal = ({ user, onClose }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleSave = () => {
      setUsers(users.map(u => u.id === user.id ? editedUser : u));
      setEditMode(false);
      onClose();
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>User Details</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body">
            <div className="user-profile">
              <div className="user-avatar-section">
                <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                <div className="user-status-badges">
                  {user.verified && <span className="badge verified">Verified</span>}
                  {user.twoFactorEnabled && <span className="badge secure">2FA</span>}
                  <span className={`badge status ${user.status}`}>{user.status}</span>
                </div>
              </div>

              <div className="user-details">
                <div className="detail-group">
                  <h3>Personal Information</h3>
                  <div className="detail-item">
                    <FiUser />
                    <span>الاسم:</span>
                    {editMode ? (
                      <div className="edit-name">
                        <input 
                          value={editedUser.firstName}
                          onChange={e => setEditedUser({...editedUser, firstName: e.target.value})}
                          placeholder="First Name"
                        />
                        <input 
                          value={editedUser.lastName}
                          onChange={e => setEditedUser({...editedUser, lastName: e.target.value})}
                          placeholder="Last Name"
                        />
                      </div>
                    ) : (
                      <strong>{user.firstName} {user.lastName}</strong>
                    )}
                  </div>
                  <div className="detail-item">
                    <FiMail />
                    <span>البريد الإلكتروني:</span>
                    {editMode ? (
                      <input 
                        value={editedUser.email}
                        onChange={e => setEditedUser({...editedUser, email: e.target.value})}
                      />
                    ) : (
                      <strong>{user.email}</strong>
                    )}
                  </div>
                  <div className="detail-item">
                    <FiPhone />
                    <span>الهاتف:</span>
                    {editMode ? (
                      <input 
                        value={editedUser.phone}
                        onChange={e => setEditedUser({...editedUser, phone: e.target.value})}
                      />
                    ) : (
                      <strong>{user.phone}</strong>
                    )}
                  </div>
                  <div className="detail-item">
                    <FiMapPin />
                    <span>الموقع:</span>
                    {editMode ? (
                      <input 
                        value={editedUser.location}
                        onChange={e => setEditedUser({...editedUser, location: e.target.value})}
                      />
                    ) : (
                      <strong>{user.location}</strong>
                    )}
                  </div>
                </div>

                <div className="detail-group">
                  <h3>Account Information</h3>
                  <div className="detail-item">
                    <FiShield />
                    <span>الدور:</span>
                    {editMode ? (
                      <select 
                        value={editedUser.role}
                        onChange={e => setEditedUser({...editedUser, role: e.target.value})}
                      >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <strong className={`role-text ${user.role}`}>{user.role}</strong>
                    )}
                  </div>
                  <div className="detail-item">
                    <FiCalendar />
                    <span>تاريخ الانضمام:</span>
                    <strong>{user.joinDate}</strong>
                  </div>
                  <div className="detail-item">
                    <FiCalendar />
                    <span>آخر تسجيل دخول:</span>
                    <strong>{user.lastLogin}</strong>
                  </div>
                </div>

                <div className="detail-group">
                  <h3>Statistics</h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span>إجمالي الأرباح</span>
                      <strong>${user.totalEarnings}</strong>
                    </div>
                    <div className="stat-item">
                      <span>إجمالي الإنفاق</span>
                      <strong>${user.totalSpent}</strong>
                    </div>
                    <div className="stat-item">
                      <span>الطلبات المكتملة</span>
                      <strong>{user.completedOrders}</strong>
                    </div>
                    <div className="stat-item">
                      <span>التقييم</span>
                      <strong>⭐ {user.rating}</strong>
                    </div>
                  </div>
                </div>

                <div className="detail-group">
                  <h3>Permissions</h3>
                  <div className="permissions-list">
                    {user.permissions.map(permission => (
                      <span key={permission} className="permission-badge">
                        {permission.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {editMode ? (
              <>
                <button className="btn btn-outline" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => setEditMode(true)}>
                  <FiEdit /> Edit
                </button>
                <div className="action-buttons">
                  {user.status === 'active' ? (
                    <button 
                      className="btn btn-warning"
                      onClick={() => {
                        handleUserAction(user.id, 'suspend');
                        onClose();
                      }}
                    >
                      <FiLock /> Suspend
                    </button>
                  ) : (
                    <button 
                      className="btn btn-success"
                      onClick={() => {
                        handleUserAction(user.id, 'activate');
                        onClose();
                      }}
                    >
                      <FiUnlock /> Activate
                    </button>
                  )}
                  <button 
                    className="btn btn-danger"
                    onClick={() => {
                      handleDeleteUser(user.id);
                      onClose();
                    }}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AddUserModal = ({ onClose }) => {
    const [newUser, setNewUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'buyer',
      location: '',
      password: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const user = {
        ...newUser,
        id: Math.max(...users.map(u => u.id)) + 1,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        totalEarnings: 0,
        totalSpent: 0,
        completedOrders: 0,
        rating: 0,
        avatar: 'https://via.placeholder.com/40x40',
        verified: false,
        twoFactorEnabled: false,
        permissions: newUser.role === 'seller' ? ['create_gig', 'edit_gig'] : ['place_orders']
      };
      setUsers([...users, user]);
      onClose();
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Add New User</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text"
                  value={newUser.firstName}
                  onChange={e => setNewUser({...newUser, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text"
                  value={newUser.lastName}
                  onChange={e => setNewUser({...newUser, lastName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="tel"
                  value={newUser.phone}
                  onChange={e => setNewUser({...newUser, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input 
                  type="text"
                  value={newUser.location}
                  onChange={e => setNewUser({...newUser, location: e.target.value})}
                />
              </div>
              <div className="form-group full-width">
                <label>Password</label>
                <input 
                  type="password"
                  value={newUser.password}
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <FiUserPlus /> Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>User Management</h2>
        <div className="section-actions">
          <div className="filters">
            <select 
              value={filters.role}
              onChange={e => setFilters({...filters, role: e.target.value})}
            >
              <option value="all">All Roles</option>
              <option value="buyer">Buyers</option>
              <option value="seller">Sellers</option>
              <option value="admin">Admins</option>
            </select>
            
            <select 
              value={filters.status}
              onChange={e => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>

            <input 
              type="text"
              placeholder="Search users..."
              value={filters.search}
              onChange={e => setFilters({...filters, search: e.target.value})}
            />
          </div>

          <div className="action-buttons">
            <button className="btn btn-outline">
              <FiDownload /> Export
            </button>
            <button className="btn btn-outline">
              <FiUpload /> Import
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddUserModal(true)}
            >
              <FiUserPlus /> Add User
            </button>
          </div>
        </div>
      </div>

      <div className="users-grid">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
              <div className="user-badges">
                {user.verified && <span className="badge verified">✓</span>}
                {user.twoFactorEnabled && <span className="badge secure">2FA</span>}
              </div>
            </div>

            <div className="user-card-body">
              <h3>{user.firstName} {user.lastName}</h3>
              <p className="user-email">{user.email}</p>
              <div className="user-meta">
                <span className={`role-badge ${user.role}`}>{user.role}</span>
                <span className={`status-badge ${user.status}`}>{user.status}</span>
              </div>
              
              <div className="user-stats">
                <div className="stat">
                  <span>الأرباح</span>
                  <strong>${user.totalEarnings}</strong>
                </div>
                <div className="stat">
                  <span>الطلبات</span>
                  <strong>{user.completedOrders}</strong>
                </div>
                <div className="stat">
                  <span>التقييم</span>
                  <strong>⭐ {user.rating}</strong>
                </div>
              </div>
            </div>

            <div className="user-card-footer">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSelectedUser(user);
                  setShowUserModal(true);
                }}
              >
                <FiEye /> View
              </button>
              
              {user.status === 'active' ? (
                <button 
                  className="btn btn-warning btn-sm"
                  onClick={() => handleUserAction(user.id, 'suspend')}
                >
                  <FiLock /> Suspend
                </button>
              ) : (
                <button 
                  className="btn btn-success btn-sm"
                  onClick={() => handleUserAction(user.id, 'activate')}
                >
                  <FiUnlock /> Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-results">
          <h3>No users found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}

      {showUserModal && selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }} 
        />
      )}

      {showAddUserModal && (
        <AddUserModal onClose={() => setShowAddUserModal(false)} />
      )}
    </div>
  );
};

export default UserManagement;