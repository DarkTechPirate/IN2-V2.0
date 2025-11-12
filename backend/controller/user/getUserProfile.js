

export const getUserProfile = async (req, res) => {
  try {
    // req.user is already set by authMiddleware
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses || [],
      },
    });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
