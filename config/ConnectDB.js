import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.CONNECTION_URL;

const ConnectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};
export default ConnectDB;
