import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import { User, Lock, Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      const newUserData = { name, email, role: "customer" };
      toast.success("Account created successfully!");
      onLogin("user", newUserData);
    }
  };

  const handleGoogleSignupRedirect = () => {
    toast.info("Redirecting to Google signup...");
    const mockGoogleUser = {
      name: "Google User",
      email: "google.user@gmail.com",
    };
    setTimeout(() => {
      onLogin("user", mockGoogleUser);
      toast.success("Welcome, Google User!");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-white">
      <div className="relative hidden lg:flex items-center justify-center bg-gray-900">
        <ImageWithFallback
          src="/hero/dark.jpg"
          alt="IN2 Brand"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center space-y-4 p-8">
          <h1
            className="text-7xl font-bold tracking-tight text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            IN<span className="text-primary_green">2</span>
          </h1>
          <p
            className="text-white/80 text-2xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Luxury in Motion.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center lg:hidden">
              <h1
                className="text-5xl font-bold tracking-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                IN<span className="text-primary_green">2</span>
              </h1>
            </div>

            <div className="text-center mt-4 lg:mt-0">
              <h2
                className="text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Create Your Account
              </h2>
              <p className="mt-2 text-gray-600">
                Start your journey with us today.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <Button
                variant="outline"
                className="w-full h-12 text-base flex items-center justify-center gap-2"
                onClick={handleGoogleSignupRedirect}
              >
                <GoogleIcon />
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or sign up with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Alex Johnson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 h-.12"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 bg-primary_green hover:bg-primary_green/90 text-white gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
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
