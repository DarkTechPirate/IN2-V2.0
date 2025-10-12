import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Save, Edit2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fashion Ave',
    city: 'New York',
    state: 'NY',
    pincode: '10001',
    country: 'United States',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 
            className="mb-2"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            My Profile
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Manage your personal information
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
        >
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://images.unsplash.com/photo-1641808887823-b3201916a57d?w=200" />
              <AvatarFallback className="bg-[#2FF924]/10 text-[#2FF924] text-2xl">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {profileData.name}
              </h2>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                {profileData.email}
              </p>
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-2 border-[#2FF924] text-[#2FF924] hover:bg-[#2FF924] hover:text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave}>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <User className="w-5 h-5 text-[#2FF924]" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-2 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] disabled:opacity-70"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] disabled:opacity-70"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Phone className="w-5 h-5 text-[#2FF924]" />
                  Contact Information
                </h3>
                <div>
                  <Label htmlFor="phone" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Phone Number
                  </Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] disabled:opacity-70"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <MapPin className="w-5 h-5 text-[#2FF924]" />
                  Address Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditing}
                      className="mt-2 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] disabled:opacity-70"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" style={{ fontFamily: 'Inter, sans-serif' }}>
                        City
                      </Label>
                      <Input
                        id="city"
                        type="text"
                        value={profileData.city}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        disabled={!isEditing}
                        className="mt-2 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] disabled:opacity-70"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" style={{ fontFamily: 'Inter, sans-serif' }}>
                        State
                      </Label>
                      <Input
                        id="state"
                        type="text"
                        value={profileData.state}
                        onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                        disabled={!isEditing}
                        className="mt-2 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] disabled:opacity-70"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pincode" style={{ fontFamily: 'Inter, sans-serif' }}>
                        PIN Code
                      </Label>
                      <Input
                        id="pincode"
                        type="text"
                        value={profileData.pincode}
                        onChange={(e) => setProfileData({ ...profileData, pincode: e.target.value })}
                        disabled={!isEditing}
                        className="mt-2 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] disabled:opacity-70"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Country
                      </Label>
                      <Input
                        id="country"
                        type="text"
                        value={profileData.country}
                        onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                        disabled={!isEditing}
                        className="mt-2 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924] disabled:opacity-70"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-[#2FF924] hover:bg-[#26d41f] text-white"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 h-12"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
