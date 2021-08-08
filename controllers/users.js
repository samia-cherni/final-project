import User from "../models/users.js";
import Post from "../models/posts.js";
export const search = async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: req.query.name } })
      .limit(10)
      .select("name avatar");
    res.json({ users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers following", "-password");
    if (!user) return res.status(404).json({ msg: "User Does not exist" });
    res.json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const update = async (req, res) => {
  try {
    const { name, email, about, gender, avatar } = req.body;
    if (!name) return res.status(400).json({ msg: "Please add your name." });
    await User.updateOne(
      { _id: req.user._id },
      { name, email, about, gender, avatar }
    );
    res.json({ msg: "Updated!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const follow = async (req, res) => {
  try {
    const user = await User.find({
      _id: req.params.id,
      followers: req.user._id,
    });
    if (user.length > 0)
      return res.status(400).json({ msg: "You already follow this user." });
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    ).populate("followers following", "-password");
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: { following: req.params.id },
      },
      { new: true }
    );
    res.json({ msg: "Following!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const unfollow = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    ).populate("followers following", "-password");
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: { following: req.params.id },
      },
      { new: true }
    );
    res.json({ msg: "Unfollowed!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const deleteUser = async (req, res) => {
try {
        const user = await User.findOneAndDelete({
          _id: req.params.id,
        });
        await Post.deleteMany({ creator: req.params.id });
        if ( req.user.role === 1){
          const user = await User.findOneAndDelete({
            _id: req.params.id,
          });
          await Post.deleteMany({ creator: req.params.id });
        }
        res.json({ msg: "Profile Deleted!", user });
      }
     catch (error) {
      return res.status(500).json({ msg: error.message });
    }
    
};
