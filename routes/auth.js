import express from "express";
import {register,login,logout,generateToken} from '../controllers/auth.js';
const Router=express.Router();
Router.post("/register", register);
Router.post("/login", login);
Router.post("/logout",logout);
Router.post('/refresh',generateToken);
export default Router;