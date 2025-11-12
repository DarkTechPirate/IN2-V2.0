import jwt from "jsonwebtoken";
import User from "../../../model/user.js";
import { generateAccessToken } from "../../../auth/generateTokens.js";

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid refresh token" });

    const accessToken = generateAccessToken(user._id);

    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: "Refresh token expired or invalid" });
  }
};
