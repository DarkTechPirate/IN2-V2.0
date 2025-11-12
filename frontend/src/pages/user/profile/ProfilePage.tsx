import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Save, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { useAuth } from "../../../context/AuthContext";
import { apiService } from "../../../services/api";

export function ProfilePage() {
  const { user, fetchMe, setSession } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    profilePic: "",
  });

  // Fetch user data on load
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchMe(); // from AuthContext
        if (res) {
          setProfileData((prev) => ({
            ...prev,
            ...res,
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  // Save changes
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (profileData.name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }
    if (profileData.phone && !/^[\d\s+()-]{6,20}$/.test(profileData.phone)) {
      toast.error("Invalid phone number");
      return;
    }

    try {
      setLoading(true);
      const res = await apiService.put<{ message: string; user: any }>(
        `/api/user/profile/update`, // ✅ update by ID
        profileData
      );

      setSession(null, undefined, res.user);
      toast.success(res.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => setIsEditing(false);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading profile...
      </div>
    );

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
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            My Profile
          </h1>
          <p className="text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
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
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profileData.profilePic} />
              <AvatarFallback className="bg-primary_green/10 text-primary_green text-2xl">
                {profileData.name
                  ? profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                {profileData.name}
              </h2>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {profileData.email}
              </p>
            </div>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-2 border-primary_green text-primary_green hover:bg-primary_green hover:text-white"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave}>
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary_green" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-2 h-12 border-gray-300 focus:border-primary_green"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      disabled
                      className="mt-2 h-12 bg-gray-50 border-gray-300 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary_green" />
                  Contact Information
                </h3>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2 h-12 border-gray-300 focus:border-primary_green"
                />
              </div>

              {/* Address Info */}
              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary_green" />
                  Address Information
                </h3>
                <Input
                  id="address"
                  placeholder="Street Address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2 h-12 border-gray-300 focus:border-primary_green"
                />
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Input
                    id="city"
                    placeholder="City"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    disabled={!isEditing}
                    className="h-12 border-gray-300 focus:border-primary_green"
                  />
                  <Input
                    id="state"
                    placeholder="State"
                    value={profileData.state}
                    onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                    disabled={!isEditing}
                    className="h-12 border-gray-300 focus:border-primary_green"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Input
                    id="pincode"
                    placeholder="PIN Code"
                    value={profileData.pincode}
                    onChange={(e) => setProfileData({ ...profileData, pincode: e.target.value })}
                    disabled={!isEditing}
                    className="h-12 border-gray-300 focus:border-primary_green"
                  />
                  <Input
                    id="country"
                    placeholder="Country"
                    value={profileData.country}
                    onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                    disabled={!isEditing}
                    className="h-12 border-gray-300 focus:border-primary_green"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 bg-primary_green hover:bg-[#26d41f] text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 h-12"
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
