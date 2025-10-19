import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { UserPlus, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SignupPageProps {
  onSignup: (userData: any) => void;
  onNavigate: (page: string) => void;
}

export function SignupPage({ onSignup, onNavigate }: SignupPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'United States',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Create user account
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      country: formData.country,
    };

    onSignup(userData);
    toast.success('Account created successfully!');
    onNavigate('home');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-6">
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
              Join the movement
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Full Name *
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      required
                      className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email Address *
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      required
                      className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Password *
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      required
                      className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirm-password" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Confirm Password *
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                      required
                      className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <Label htmlFor="phone" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Phone Number *
                </Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    required
                    className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Street Address *
                </Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Fashion Ave"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    required
                    className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" style={{ fontFamily: 'Inter, sans-serif' }}>
                    City *
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    required
                    className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <Label htmlFor="state" style={{ fontFamily: 'Inter, sans-serif' }}>
                    State *
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    required
                    className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pincode" style={{ fontFamily: 'Inter, sans-serif' }}>
                    PIN Code *
                  </Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="10001"
                    value={formData.pincode}
                    onChange={(e) => updateFormData('pincode', e.target.value)}
                    required
                    className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <Label htmlFor="country" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Country *
                  </Label>
                  <Input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    required
                    className="mt-2 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </Button>

              <p className="text-center text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-primary_green hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
