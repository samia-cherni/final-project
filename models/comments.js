import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    contents: { type: String, required: true, maxlength: 400 },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
    postId: mongoose.Types.ObjectId,
    postcreatorId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Comment", commentSchema);
