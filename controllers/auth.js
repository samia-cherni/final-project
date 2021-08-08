import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createAccessToken=(payload)=>{return jwt.sign(payload,process.env.SECRET_ACCESS_KEY,{expiresIn:'1d'})};
const createRefreshToken=(payload)=>{
  return jwt.sign(payload, process.env.SECRET_REFRESH_KEY, { expiresIn: "30d" });
};
export const register=async(req,res)=>{
    try {
        const { email, password, firstName, lastName  } = req.body;
        console.log(req.body);
        const oldUser=await User.findOne({email})
        if(oldUser) return res.status(400).json({msg:'This User already exists'});
        if(password.length<6) return res.status(400).json({msg:'Password must contain at least 6 characters'});
        const hashedPassword=await bcrypt.hash(password,12);
        console.log(hashedPassword);
        const newUser=new User({email,password:hashedPassword,name:`${firstName} ${lastName}`})
        console.log(newUser);
        const accessToken=createAccessToken({id:newUser._id})
        const refreshToken = createRefreshToken({ id: newUser._id });
        console.log({accessToken,refreshToken})
        res.cookie("refreshtoken", refreshToken, {
          httpOnly: true,
          path: "/api/refresh",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        });
        await newUser.save();
        res.json({msg:"registered!",
        accessToken,
        user:{
          ...newUser._doc,
          password:""
        }
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}
export const login = async (req, res) => {
  try {
    const{email,password}=req.body;
    const oldUser=await User.findOne({email})
    .populate("followers following", "-password")
    if(!oldUser) return res.status(404).json({msg:"User does not exist"});

    const isMatch=await bcrypt.compare(password,oldUser.password);
    if(!isMatch) return res.status(400).json({ msg: "password is incorrect" });
    
    const accessToken = createAccessToken({ id: oldUser._id });
    const refreshToken = createRefreshToken({ id: oldUser._id });
    console.log({ accessToken, refreshToken });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      path: "/api/refresh",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });
    res.json({
      msg: "Login successful!",
      accessToken,
      user: {
        ...oldUser._doc,
        password: "",
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/refresh" });
    return res.status(200).json({msg:"Logout successful!"})
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
export const generateToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if(!rf_token) return res.status(400).json({ msg: "Please Login" });
    jwt.verify(
      rf_token,
      process.env.SECRET_REFRESH_KEY,
      async (err, result) => {
        if (err) return res.status(400).json({ msg: "Please login now." });

        const user = await User.findById(result.id)
          .select("-password")
          .populate(
            "followers following",
            "avatar name followers following"
          );

        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const accessToken = createAccessToken({ id: result.id });

        res.json({
          accessToken,
          user,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};