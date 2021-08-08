import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: String,
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
  tags: { type: [String], default: [] },
  image: String,
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  creationDate: {
    type: Date,
    default: new Date(),
  },
});
export default mongoose.model('posts',postSchema);
 