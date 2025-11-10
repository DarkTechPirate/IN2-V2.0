import User from "../../../model/user.js";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../../../auth/generateTokens.js";
import crypto from "crypto";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


/* -----------------------------------
  GOOGLE AUTH (Signup / Login / Link)
------------------------------------*/
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken)
      return res.status(400).json({ message: "Google Token Missing" });

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // New User via Google
      user = await User.create({
        name,
        email,
        googleId,
        profilePic: picture,
        isVerified: true,
      });
    } else if (!user.googleId) {
      // Existing Manual User → Link Google
      user.googleId = googleId;
      user.profilePic = picture;
      user.isVerified = true;
      await user.save();
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Google Auth Success",
      token,
      user: {
        id: user._id,
        name,
        email,
        profilePic: user.profilePic,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Invalid Google Token" });
  }
};