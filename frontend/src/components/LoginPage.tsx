import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { LogIn, User, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginPageProps {
  onLogin: (userType: 'user' | 'admin', userData: any) => void;
  onNavigate: (page: string) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock user validation
    if (userEmail && userPassword) {
      const userData = {
        name: 'Alex Johnson',
        email: userEmail,
        phone: '+1 (555) 123-4567',
        address: '123 Fashion Ave',
        city: 'New York',
        state: 'NY',
        pincode: '10001',
        country: 'United States',
      };
      onLogin('user', userData);
      toast.success('Welcome back!');
      onNavigate('home');
    } else {
      toast.error('Please enter valid credentials');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock admin validation - in production, use secure backend authentication
    if (adminEmail === 'admin@in2.com' && adminPassword === 'admin123') {
      const adminData = {
        name: 'Admin',
        email: adminEmail,
        role: 'admin',
      };
      onLogin('admin', adminData);
      toast.success('Admin login successful!');
      onNavigate('admin-dashboard');
    } else {
      toast.error('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-md px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-2 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              IN<span style={{ color: '#2FF924' }}>2</span>
            </div>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Welcome back to luxury in motion
            </p>
          </div>

          {/* Login Tabs */}
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="user" style={{ fontFamily: 'Inter, sans-serif' }}>
                User Login
              </TabsTrigger>
              <TabsTrigger value="admin" style={{ fontFamily: 'Inter, sans-serif' }}>
                Admin Login
              </TabsTrigger>
            </TabsList>

            {/* User Login */}
            <TabsContent value="user">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <form onSubmit={handleUserLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="user-email" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="user-email"
                        type="email"
                        placeholder="your@email.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="user-password" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="user-password"
                        type="password"
                        placeholder="••••••••"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>

                  <p className="text-center text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('signup')}
                      className="text-primary_green hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </div>
            </TabsContent>

            {/* Admin Login */}
            <TabsContent value="admin">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-xs text-yellow-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Demo: admin@in2.com / admin123
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="admin-email" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Admin Email
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@in2.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="admin-password" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Admin Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
