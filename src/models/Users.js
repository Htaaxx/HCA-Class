import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// export default mongoose.models.User || mongoose.model("User", UserSchema);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Get user information by email
export async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email }).select("firstName lastName email -_id");
    return user;
  }
  catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}


export default User;


