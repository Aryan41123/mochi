// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, default: "" },
  email: { type: String, required: true },
  imageUrl: { type: String },
  profileImageUrl: { type: String },
  createdAt: { type: Date },
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;