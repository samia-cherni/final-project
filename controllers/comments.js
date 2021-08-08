import Comment from "../models/comments.js";
import Post from "../models/posts.js";

export const createComment = async (req, res) => {
  try {
    const { postId, contents, tag, reply, postcreatorId } = req.body;
    const comment = new Comment({
      contents,
      tag,
      reply,
      postcreatorId,
      postId,
      creator: req.user._id,
    });
    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: comment._id } },
      { new: true }
    );
    await comment.save();
    res.json({ comment, msg: "Comment Posted" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { contents } = req.body;
    await Comment.findOneAndUpdate(
      { _id: req.params.id, creator: req.user._id },
      { contents }
    );
    res.json({ msg: "Comment updated!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const likeComment = async (req, res) => {
  try {
    const comment = Comment.find({ _id: req.params.id, likes: req.user._id });
    if (comment.length > 0)
      return res.status(400).json({ msg: "You already liked this post" });
    await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: req.user._id } },
      { new: true }
    );
    res.json({ msg: "Liked!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const unLikeComment = async (req, res) => {
  try {
    await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.json({ msg: "Unliked!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
     if (req.user.role === 1) {
       const comment = await Comment.deleteOne({ _id: req.params.id });
       await Post.findOneAndUpdate(
         { _id: comment.postId },
         { $pull: { comments: req.params.id } },
         { new: true }
       );
     } else {
       const comment = await Comment.findOneAndDelete({
         _id: req.params.id,
         $or: [{ creator: req.user._id }, { postcreatorId: req.user._id }],
       });
       console.log(comment);
       await Post.findOneAndUpdate(
         { _id: comment.postId },
         { $pull: { comments: req.params.id } },
         { new: true }
       );
     }
    res.json({ msg: "Deleted comment!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
