import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, userRole) => {
  return jwt.sign({ id: userId, role: userRole}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId , userRole) => {
  return jwt.sign({ id: userId , role: userRole}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
