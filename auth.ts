// Simple authentication management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'vendor';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVerified?: boolean;
  role: UserRole;
  storeName?: string; // For vendors
  storeDescription?: string; // For vendors
  storeAddress?: string; // For vendors
};

export type VerificationData = {
  userId: string;
  code: string;
  expiresAt: number;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  users: User[];
  pendingVerifications: VerificationData[];
  register: (
    name: string, 
    email: string, 
    phone: string, 
    password: string, 
    role?: UserRole, 
    storeInfo?: {
      storeName?: string;
      storeDescription?: string;
      storeAddress?: string;
    }
  ) => Promise<{ userId: string, verificationCode: string }>;
  verifyEmail: (userId: string, code: string) => Promise<boolean>;
  resendVerificationCode: (email: string) => Promise<string | null>;
  updateStoreInfo: (
    userId: string,
    storeInfo: {
      storeName: string;
      storeDescription?: string;
      storeAddress?: string;
      phone: string;
    }
  ) => Promise<boolean>;
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// In a real app, this would connect to a backend API
// For now, we're using localStorage persistence via zustand/persist
export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      users: [],
      pendingVerifications: [],
      
      // Generate a random 6-digit verification code
      generateVerificationCode: () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      },

      // Simulate sending an email (in a real app, this would call an API)
      sendVerificationEmail: (email: string, code: string) => {
        console.log(`Email sent to ${email} with verification code: ${code}`);
        // In a real app, this would call a backend API to send an actual email
      },
      
      register: async (name, email, phone, password, role: UserRole = 'customer', storeInfo = {}) => {
        try {
          // Validation
          if (!name || !email || !phone || !password) {
            throw new Error('جميع الحقول مطلوبة');
          }
          
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('البريد الإلكتروني غير صالح');
          }
          
          if (!/^\d{9}$/.test(phone)) {
            throw new Error('رقم الهاتف يجب أن يتكون من 9 أرقام');
          }
          
          // Additional validation for vendors
          if (role === 'vendor') {
            if (!storeInfo.storeName) {
              throw new Error('اسم المتجر مطلوب');
            }
          }
          
          const { users } = get();
          
          // Check if email or phone already exists
          const existingUser = users.find(u => u.email === email || u.phone === phone);
          if (existingUser) {
            throw new Error('البريد الإلكتروني أو رقم الهاتف مسجل بالفعل');
          }
          
          // Create new user with unverified status
          const newUser: User = {
            id: Math.random().toString(36).substring(2, 15),
            name,
            email,
            phone,
            isVerified: false,
            role,
            ...(role === 'vendor' && {
              storeName: storeInfo.storeName,
              storeDescription: storeInfo.storeDescription,
              storeAddress: storeInfo.storeAddress,
            }),
          };
          
          // Generate verification code
          const verificationCode = get().generateVerificationCode();
          
          // Create verification record
          const verification: VerificationData = {
            userId: newUser.id,
            code: verificationCode,
            expiresAt: Date.now() + 3600000 // Code expires in 1 hour
          };
          
          // Add user and verification data
          set(state => ({ 
            users: [...state.users, newUser],
            pendingVerifications: [...state.pendingVerifications, verification],
            // User is created but not authenticated until verified
          }));
          
          // Simulate sending verification email
          get().sendVerificationEmail(email, verificationCode);
          
          // Return userId and verificationCode for testing purposes
          // In a real app, we would only return success status
          return { userId: newUser.id, verificationCode };
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },
      
      verifyEmail: async (userId, code) => {
        try {
          const { users, pendingVerifications } = get();
          
          // Find verification record
          const verification = pendingVerifications.find(v => v.userId === userId && v.code === code);
          
          if (!verification) {
            throw new Error('رمز التحقق غير صحيح');
          }
          
          if (verification.expiresAt < Date.now()) {
            throw new Error('انتهت صلاحية رمز التحقق');
          }
          
          // Find and update user
          const userIndex = users.findIndex(u => u.id === userId);
          if (userIndex === -1) {
            throw new Error('المستخدم غير موجود');
          }
          
          const updatedUser = { ...users[userIndex], isVerified: true };
          const updatedUsers = [...users];
          updatedUsers[userIndex] = updatedUser;
          
          // Remove verification record
          const updatedVerifications = pendingVerifications.filter(v => !(v.userId === userId && v.code === code));
          
          // Update state
          set({
            users: updatedUsers,
            pendingVerifications: updatedVerifications,
            user: updatedUser,
            isAuthenticated: true,
            token: `token-${updatedUser.id}`,
          });
          
          return true;
        } catch (error) {
          console.error('Verification error:', error);
          throw error;
        }
      },
      
      resendVerificationCode: async (email) => {
        try {
          const { users, pendingVerifications } = get();
          
          // Find user by email
          const user = users.find(u => u.email === email && !u.isVerified);
          
          if (!user) {
            throw new Error('البريد الإلكتروني غير مسجل أو الحساب مفعل بالفعل');
          }
          
          // Generate new verification code
          const newCode = get().generateVerificationCode();
          
          // Update or create verification record
          const existingVerificationIndex = pendingVerifications.findIndex(v => v.userId === user.id);
          let updatedVerifications;
          
          const newVerification: VerificationData = {
            userId: user.id,
            code: newCode,
            expiresAt: Date.now() + 3600000 // Code expires in 1 hour
          };
          
          if (existingVerificationIndex !== -1) {
            updatedVerifications = [...pendingVerifications];
            updatedVerifications[existingVerificationIndex] = newVerification;
          } else {
            updatedVerifications = [...pendingVerifications, newVerification];
          }
          
          set({ pendingVerifications: updatedVerifications });
          
          // Simulate sending verification email
          get().sendVerificationEmail(email, newCode);
          
          return newCode; // Return code for testing purposes
        } catch (error) {
          console.error('Resend verification error:', error);
          throw error;
        }
      },
      
      login: async (emailOrPhone, password) => {
        try {
          if (!emailOrPhone || !password) {
            throw new Error('جميع الحقول مطلوبة');
          }
          
          const { users } = get();
          
          // Find user by email or phone
          const user = users.find(u => u.email === emailOrPhone || u.phone === emailOrPhone);
          
          if (!user) {
            throw new Error('بيانات الدخول غير صحيحة');
          }
          
          // Check if user is verified
          if (user.isVerified === false) {
            throw new Error('الرجاء تفعيل حسابك عن طريق رمز التحقق المرسل إلى بريدك الإلكتروني');
          }
          
          // In a real app, we would verify the password hash
          // For now, just authenticate the user
          set({
            user,
            isAuthenticated: true,
            token: `token-${user.id}`,
          });
          
          return true;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      
      updateStoreInfo: async (userId, storeInfo) => {
        try {
          const { users } = get();
          
          // Find user by ID
          const userIndex = users.findIndex(u => u.id === userId);
          
          if (userIndex === -1) {
            throw new Error('المستخدم غير موجود');
          }
          
          // Ensure user is a vendor
          if (users[userIndex].role !== 'vendor') {
            throw new Error('المستخدم ليس بائعاً');
          }
          
          // Validate store name
          if (!storeInfo.storeName || storeInfo.storeName.length < 3) {
            throw new Error('اسم المتجر يجب أن يكون 3 أحرف على الأقل');
          }
          
          // Validate phone
          if (!/^\d{9}$/.test(storeInfo.phone)) {
            throw new Error('رقم الهاتف يجب أن يتكون من 9 أرقام');
          }
          
          // Create updated user
          const updatedUser = {
            ...users[userIndex],
            storeName: storeInfo.storeName,
            storeDescription: storeInfo.storeDescription || users[userIndex].storeDescription,
            storeAddress: storeInfo.storeAddress || users[userIndex].storeAddress,
            phone: storeInfo.phone
          };
          
          // Update users array
          const updatedUsers = [...users];
          updatedUsers[userIndex] = updatedUser;
          
          // Update state
          set(state => ({
            users: updatedUsers,
            user: state.user?.id === userId ? updatedUser : state.user
          }));
          
          return true;
        } catch (error) {
          console.error('Store update error:', error);
          throw error;
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        });
      },
    }),
    {
      name: 'dokan-auth-storage',
    }
  )
);