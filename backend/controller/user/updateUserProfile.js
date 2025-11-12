import User from "../../model/user.js";
import mongoose from "mongoose";

/**
 * @route PUT /api/user/profile
 * @desc Update user profile (only self)
 * @access Private
 */
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id?.toString?.();
    console.log("Updating profile for user ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Whitelisted fields only
    const allowedFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
      "country",
      "profilePic",
    ];

    // 🔎 Automatically strip out non-whitelisted keys (instead of rejecting)
    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    // ✅ Basic input validation
    if (updates.email && !updates.email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (updates.phone && !/^[\d\s+()-]{6,20}$/.test(updates.phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    if (updates.name && updates.name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters" });
    }

    // 🧠 Apply updates safely
    Object.assign(user, updates);
    await user.save();

    // 🧩 Remove sensitive data
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Profile updated successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        message: "Invalid ID format",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
