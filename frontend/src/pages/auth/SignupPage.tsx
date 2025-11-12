import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { motion } from "framer-motion";
import { User, Lock, Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="1.25em" height="1.25em">
    <path
      fill="#FFC107"
      d="M43.6 20.283H24v7.428h11.303c-1.64 4.793-6.082 8.237-11.303 8.237-6.804 0-12.336-5.532-12.336-12.336s5.532-12.336 12.336-12.336c3.734 0 6.946 1.63 9.07 4.13l5.88-5.88C35.08 6.73 30.01 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.34 0 19.45-8.41 19.45-19.857 0-1.302-.14-2.404-.35-3.86z"
    />
  </svg>
);

export function SignupPage() {
  const navigate = useNavigate();
  const { signupWithCredentials, loginWithGoogle, isLoggedIn } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (isLoggedIn) navigate("/");

  /** -------------------------------
   *  Normal Signup (email/password)
   * ------------------------------- */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      await signupWithCredentials(name, email, password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  /** -------------------------------
   *  Google Signup/Login
   * ------------------------------- */
  const onGoogleSuccess = async (credential: string | undefined) => {
    if (!credential) {
      toast.error("Google credential missing");
      return;
    }
    try {
      setLoading(true);
      await loginWithGoogle(credential);
      toast.success("Signed in with Google");
      navigate("/");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Google authentication failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-gradient-to-br from-primary_green/10 via-white to-white">
      {/* Left Panel */}
      <div className="relative hidden lg:flex items-center justify-center bg-gray-900">
        <ImageWithFallback
          src="/hero/dark.jpg"
          alt="IN2 Brand"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center space-y-4 p-8">
          <div className="text-7xl mb-2 tracking-tight text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            IN<span style={{ color: "#2FF924" }}>2</span>
          </div>
          <p className="text-white/80 text-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
            Luxury in Motion.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center pt-20 pb-12 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Mobile Logo */}
            <div className="text-center mb-8 lg:hidden">
              <div className="text-4xl mb-2 tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                IN<span style={{ color: "#2FF924" }}>2</span>
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-center mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
              Create Your Account
            </h2>
            <p className="text-gray-600 text-center mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Start your journey with us today.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              {/* Google Signup */}
              <div className="w-full flex flex-col gap-3">
                <GoogleLogin
                  onSuccess={(cred) => onGoogleSuccess(cred.credential)}
                  onError={() => toast.error("Google sign-in failed")}
                />
                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center mb-2">
                  <GoogleIcon />
                  <span>Sign up is powered by Google</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
                </div>
              </div>

              {/* Email Signup Form */}
              <form onSubmit={handleSignup} className="mt-6 space-y-6">
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
                      className="pl-10 h-12 w-full"
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
                      className="pl-10 h-12 w-full"
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
                      className="pl-10 h-12 w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-10 h-12 w-full"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white disabled:opacity-70"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </form>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-primary_green hover:underline font-medium">
                Sign in
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
