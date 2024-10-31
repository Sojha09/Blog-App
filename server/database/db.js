import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@blog-app-shard-00-00.wbyun.mongodb.net:27017,blog-app-shard-00-01.wbyun.mongodb.net:27017,blog-app-shard-00-02.wbyun.mongodb.net:27017/?ssl=true&replicaSet=atlas-fpo9wb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;
  try {
    await mongoose.connect(URL);
    console.log("Database Is Successfully Connected");
  } catch (error) {
    console.log("Error while connecting with database ", error);
  }
};

export default Connection;
