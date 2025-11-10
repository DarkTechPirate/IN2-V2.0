import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Local Auth Password (not required if Google is used)
    password: {
      type: String,
      minlength: 6,
      select: false,
      default: null,
    },

    // ✅ Google OAuth Login Fields
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows null + unique
    },

    profilePic: {
      type: String, // local upload or google image url
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },

    addresses: [
      {
        fullName: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // 🔐 Email Verification
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);



export default mongoose.model("User", userSchema);
