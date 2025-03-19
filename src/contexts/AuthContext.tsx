
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    // This is a mock implementation. In a real app, you would verify with a backend
    return new Promise<void>((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // For demo purposes, accept any email/password
        // In a real app, this would be a server verification
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: email,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const signUp = async (name: string, email: string, password: string) => {
    // This is a mock implementation. In a real app, you would register with a backend
    return new Promise<void>((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // For demo purposes, accept any registration
        // In a real app, this would create a user on the server
        const mockUser: User = {
          id: '1',
          name: name,
          email: email,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
