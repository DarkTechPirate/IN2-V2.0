import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { User, Lock, Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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

interface SignupPageProps {
  onLogin: (userType: "user", userData: any) => void;
}

export function SignupPage({ onLogin }: SignupPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock user validation
    if (name && email && password) {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      const newUserData = {
        name: name,
        email: email,
        role: "customer", // Default role from your schema
        // Other fields would be populated by the backend
      };

      // In a real app, you'd send this to your backend API.
      // We'll simulate a successful API call.

      toast.success("Account created successfully!");

      // Automatically log the new user in and navigate
      onLogin("user", newUserData); // Navigation is handled by App.tsx after onLogin
    }
  };

  const handleGoogleSignupRedirect = () => {
    // Redirect to your backend's Google OAuth initiation endpoint
    window.location.href = "/api/auth/google"; // Example backend endpoint
  };

  const navigate = useNavigate(); // Initialize useNavigate for internal navigation

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-gradient-to-br from-primary_green/10 via-white to-white">
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

      {/* --- Right Side: Signup Form --- */}
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
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Create Your Account
            </h2>
            <p
              className="text-gray-600 text-center mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Start your journey with us today.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <Button
                variant="outline"
                className="w-full h-12 text-base"
                onClick={handleGoogleSignupRedirect}
              >
                <GoogleIcon className="mr-2" />
                Sign up with Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or sign up with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Full Name
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Alex Johnson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Email Address
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </form>
            </div>

            <p
              className="mt-8 text-center text-sm text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-primary_green hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
