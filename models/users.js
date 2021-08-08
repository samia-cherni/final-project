import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 25 },
  email: { type: String, required: true, trim: true, unique: true },
  avatar: {
    type: String,
    default:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Flogin-4%2F512%2FLOGIN-10-512.png&f=1&nofb=1",
  },
  password: { type: String, required: true },
  gender: { type: String, default: "female" },
  about: { type: String, maxlength: 300, default: "" },
  followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  role: { type: Number, default: 0 },
});
export default mongoose.model("User", userSchema);
