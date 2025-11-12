import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Require Authorization: Bearer <accessToken>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No authorization token" });
    }

    const accessToken = authHeader.split(" ")[1];

    let decoded;
    try {
      // Verify Access Token
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Access token expired or invalid" });
    }

    // Load User
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // <-- Now available in controllers
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(500).json({ message: "Server Authentication Error" });
  }
};
