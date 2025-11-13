import jwt from "jsonwebtoken";
import User from "../model/user.js";

/**
 * General authentication middleware
 * ---------------------------------
 * - Verifies access token (Bearer <token>)
 * - Loads user data
 * - Optionally enforces admin-only access
 *
 * Usage:
 *   router.get("/admin/dashboard", authMiddleware(true), adminController);
 *   router.get("/profile", authMiddleware(), profileController);
 */
export const authMiddleware = (adminOnly = false) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // Require Authorization: Bearer <accessToken>
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No authorization token" });
      }

      const accessToken = authHeader.split(" ")[1];
      let decoded;

      try {
        decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      } catch (err) {
        return res.status(401).json({ message: "Access token expired or invalid", forceLogout: true });
      }

      // Load user from DB
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found", forceLogout: true });
      }

      // Check if user is active (optional)
      if (user.isSuspended) {
        return res.status(403).json({ message: "Account suspended. Please contact support.", forceLogout: true });
      }

      // ✅ Check admin-only access
      if (adminOnly && user.role !== "admin") {
        return res.status(403).json({
          message: "Unauthorized: Admin access required",
          forceLogout: true, // frontend can trigger logout automatically
        });
      }

      req.user = user; // attach to request object for controllers
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(500).json({ message: "Server Authentication Error", forceLogout: true });
    }
  };
};
