import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { LogIn, User, Lock } from "lucide-react";
import { toast } from "sonner"; // Removed the specific version
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback"; // Assuming this path

// Simple Google icon component (you can replace with a real SVG icon)
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="1.25em"
    height="1.25em"
  >
    <path
      fill="#FFC107"
      d="M43.6 20.283H24v7.428h11.303c-1.64 4.793-6.082 8.237-11.303 8.237-6.804 0-12.336-5.532-12.336-12.336s5.532-12.336 12.336-12.336c3.734 0 6.946 1.63 9.07 4.13l5.88-5.88C35.08 6.73 30.01 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.34 0 19.45-8.41 19.45-19.857 0-1.302-.14-2.404-.35-3.86z"
    />
  </svg>
);

interface LoginPageProps {
  onLogin: (userType: "user" | "admin", userData: any) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock user validation
    if (userEmail && userPassword) {
      const userData = {
        name: "Alex Johnson",
        email: userEmail,
        phone: "+1 (555) 123-4567",
        address: "123 Fashion Ave",
        city: "New York",
        state: "NY",
        pincode: "10001",
        country: "United States",
      };
      onLogin("user", userData);
      toast.success("Welcome back!"); // Navigation is handled by App.tsx after onLogin
    } else {
      toast.error("Please enter valid credentials");
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock admin validation
    if (adminEmail === "admin@in2.com" && adminPassword === "admin123") {
      const adminData = {
        name: "Admin",
        email: adminEmail,
        role: "admin",
      };
      onLogin("admin", adminData);
      toast.success("Admin login successful!");
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  const handleGoogleLoginRedirect = () => {
    // --- Mock Google Login ---
    // In a real app, you would redirect to your backend's
    // /auth/google endpoint or use a pop-up window.
    toast.info("Redirecting to Google login...");
    const mockGoogleUser = {
      name: "Google User",
      email: "google.user@gmail.com",
      // ...other data from Google
    };
    // Simulate a successful login after a short delay
    setTimeout(() => {
      onLogin("user", mockGoogleUser);
      toast.success("Welcome, Google User!");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* --- Left Side: Brand Poster (Desktop only) --- */}
      <div className="relative hidden lg:flex items-center justify-center bg-gray-900">
        <ImageWithFallback
          src="/hero/dark.jpg" // Poster image from your brand
          alt="IN2 Brand"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center space-y-4 p-8">
          <div
            className="text-7xl mb-2 tracking-tight text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            IN<span style={{ color: "#2FF924" }}>2</span>
          </div>
          <p
            className="text-white/80 text-2xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Luxury in Motion.
          </p>
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="flex items-center justify-center pt-20 pb-12 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo for Mobile */}
            <div className="text-center mb-8 lg:hidden">
              <div
                className="text-4xl mb-2 tracking-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                IN<span style={{ color: "#2FF924" }}>2</span>
              </div>
            </div>

            <h2
              className="text-3xl font-semibold text-center mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Welcome Back
            </h2>
            <p
              className="text-gray-600 text-center mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Login to continue your journey.
            </p>

            {/* Login Tabs */}
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="user"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  User Login
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Admin Login
                </TabsTrigger>
              </TabsList>

              {/* User Login */}
              <TabsContent value="user">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base"
                    onClick={handleGoogleLoginRedirect}
                  >
                    <GoogleIcon className="mr-2" />
                    Continue with Google
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">
                        Or login with email
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleUserLogin} className="space-y-6">
                    <div>
                      <Label
                        htmlFor="user-email"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
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
                          style={{ fontFamily: "Inter, sans-serif" }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="user-password"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
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
                          style={{ fontFamily: "Inter, sans-serif" }}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </form>
                </div>
                <p
                  className="mt-8 text-center text-sm text-gray-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-primary_green hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </TabsContent>

              {/* Admin Login */}
              <TabsContent value="admin">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <form onSubmit={handleAdminLogin} className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p
                        className="text-xs text-yellow-800"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Demo: admin@in2.com / admin123
                      </p>
                    </div>
                    <div>
                      <Label
                        htmlFor="admin-email"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
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
                          style={{ fontFamily: "Inter, sans-serif" }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="admin-password"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
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
                          style={{ fontFamily: "Inter, sans-serif" }}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white"
                      style={{ fontFamily: "Inter, sans-serif" }}
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
    </div>
  );
}
