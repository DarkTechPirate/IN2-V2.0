import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { motion } from "framer-motion";
import { LogIn, User, Lock } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

// Google logo
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="1.25em" height="1.25em">
    <path
      fill="#FFC107"
      d="M43.6 20.283H24v7.428h11.303c-1.64 4.793-6.082 8.237-11.303 8.237-6.804 0-12.336-5.532-12.336-12.336s5.532-12.336 12.336-12.336c3.734 0 6.946 1.63 9.07 4.13l5.88-5.88C35.08 6.73 30.01 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.34 0 19.45-8.41 19.45-19.857 0-1.302-.14-2.404-.35-3.86z"
    />
  </svg>
);

export function LoginPage() {
  const navigate = useNavigate();
  const { loginWithCredentials, loginWithGoogle, loginAsAdmin, isLoggedIn, user } = useAuth();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /** ✅ FIXED: Safe redirect after login */
  useEffect(() => {
    if (isLoggedIn && user) {
      const destination = user.role === "admin" ? "/admin/dashboard" : "/";
      // Wrap navigation in a microtask to ensure it's after render
      Promise.resolve().then(() => navigate(destination, { replace: true }));
    }
  }, [isLoggedIn, user, navigate]);

  /** -------------------------------
   *  User Login Handler
   * ------------------------------- */
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const user = await loginWithCredentials(userEmail, userPassword);
      toast.success(`Welcome back, ${user.name || "User"}!`);

      navigate(user.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Invalid email or password.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  /** -------------------------------
   *  Admin Login Handler
   * ------------------------------- */
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminEmail || !adminPassword) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);
      const admin = await loginAsAdmin(adminEmail, adminPassword);
      toast.success(`Welcome Admin, ${admin.name || "IN2"}!`);
      navigate("/admin/dashboard");
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Admin login failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  /** -------------------------------
   *  Google OAuth Login
   * ------------------------------- */
  const onGoogleSuccess = async (credential: string | undefined) => {
    if (!credential) {
      toast.error("Google credential missing");
      return;
    }
    try {
      setLoading(true);
      const user = await loginWithGoogle(credential);
      toast.success(`Signed in as ${user.name || "Google User"}`);
      navigate("/");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Google authentication failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-white">
      {/* Left Panel */}
      <div className="relative hidden lg:flex items-center justify-center bg-gray-900">
        <ImageWithFallback
          src="/hero/dark.jpg"
          alt="IN2 Brand"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center space-y-4 p-8">
          <h1 className="text-7xl font-bold tracking-tight text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            IN<span className="text-primary_green">2</span>
          </h1>
          <p className="text-white/80 text-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
            Luxury in Motion.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center lg:hidden">
              <h1 className="text-5xl font-bold tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                IN<span className="text-primary_green">2</span>
              </h1>
            </div>

            <div className="text-center mt-4 lg:mt-0">
              <h2 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                Welcome Back
              </h2>
              <p className="mt-2 text-gray-600">Login to continue your journey.</p>
            </div>

            <Tabs defaultValue="user" className="w-full mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              {/* User Login Tab */}
              <TabsContent value="user">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="w-full flex flex-col gap-3">
                    <GoogleLogin
                      onSuccess={(cred) => onGoogleSuccess(cred.credential)}
                      onError={() => toast.error("Google sign-in failed")}
                    />
                    <div className="flex items-center gap-2 text-xs text-gray-500 justify-center mb-2">
                      <GoogleIcon />
                      <span>Sign in is powered by Google</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or login with email</span>
                    </div>
                  </div>

                  <form onSubmit={handleUserLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email Address</Label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="your@email.com"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          required
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user-password">Password</Label>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="user-password"
                          type="password"
                          placeholder="••••••••"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          required
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-primary_green hover:bg-[#26d41f] text-white disabled:opacity-70"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Don’t have an account?{" "}
                  <button onClick={() => navigate("/signup")} className="text-primary_green hover:underline font-medium">
                    Sign up
                  </button>
                </p>
              </TabsContent>

              {/* Admin Login Tab */}
              <TabsContent value="admin" className="mt-6">
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-yellow-800">
                      Demo: <strong>admin@in2.com</strong> / <strong>admin123</strong>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@in2.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 bg-primary_green hover:bg-primary_green/90 text-white gap-2">
                    <LogIn className="h-4 w-4" />
                    Admin Login
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
