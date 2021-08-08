import Post from '../models/posts.js';
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
export const createPost = async (req, res) => {
  const post=req.body;
  const {title,description,image,tags}=post;
  if (!title||!description||!image||!tags)
    return res.status(400).json({ msg: "Please fill all fields to create a post" });
  const newPost = new Post({
    ...post,
    creator: req.user._id,
    creationDate: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(201).json({
      msg: "Created Post!",
      newPost: {
        ...newPost._doc,
        creator: req.user,
      },
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  try {
    const features=new APIfeatures(Post.find({
     creator: [...req.user.following, req.user._id],
   }),req.query).paginating()
   const timelinePosts = await features.query.sort("-creationDate")
     .populate("creator likes", "avatar name")
     .populate({
       path: "comments",
       populate:{
         path:"creator likes",
         select:"-password"
       }
     });
   res.json({
     msg: "Success!",
     result: timelinePosts.length,
     timelinePosts,
   });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
   const { title, description, image, tags } = req.body;
   const post = await Post.findOneAndUpdate(
     { _id: req.params.id },
     { title, description, image, tags }
   )
     .populate("creator likes", "avatar name")
     .populate({
       path: "comments",
       populate: {
         path: "creator likes",
         select: "-password",
       },
     });
   res.json({
     msg: "Updated!",
     updatedPost: {
       ...post._doc,
       title,
       description,
       image,
       tags,
     },
   });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const post=await Post.findOne({_id:req.params.id},{likes:req.user._id});
    if(post.length>0)return res.status(400).json({msg:"You already liked this post."})
    await Post.findOneAndUpdate({_id:req.params.id},{
      $push:{likes:req.user._id}
    },{new:true});
    res.json({msg:"Liked!"})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const unlikePost = async (req, res) => {
  try {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.json({ msg: "Unliked!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const features=new APIfeatures(Post.find({ creator: req.params.id }),req.query).paginating()
    const posts = await features.query
      .sort("-creationDate")
      .populate("creator likes", "avatar name");
    res.json({posts,
    result:posts.length});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post=await Post.deleteOne({_id:req.params.id,creator:req.user._id});
    if(req.user.role===1)
    await Post.deleteOne({_id:req.params.id})
    res.json({msg:"Deleted!",post})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getPost=async(req,res)=>{
  try {
    const post = await Post.findOne({ _id: req.params.id })
      .populate("creator likes", "avatar name")
      .populate({
        path: "comments",
        populate: {
          path: "creator likes",
          select: "-password",
        },
      });;
    res.json({post})
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
}
export const getDiscoverPosts = async (req, res) => {
  try {
    const features = new APIfeatures(
      Post.find({
        creator: {$nin:[...req.user.following, req.user._id]},
      }),
      req.query
    ).paginating();
    const posts = await features.query
      .sort("-creationDate")
      .populate("creator likes", "avatar name")
      .populate({
        path: "comments",
        populate: {
          path: "creator likes",
          select: "-password",
        },
      });
    res.json({
      msg: "Success!",
      result: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
