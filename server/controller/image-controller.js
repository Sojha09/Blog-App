import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "http://localhost:8002";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = (request, response) => {
  console.log("REached Controller");
  if (!request.file) {
    console.log("file not found");
    return response.status(404).json({ msg: "file not found" });
  }
  console.log("Image url", request.file.filename);
  const imageUrl = `${url}/file/${request.file.filename}`;

  console.log("file uploaded successfully");

  return response
    .status(200)
    .json({ msg: "File uploaded successfully", imageUrl });
};

export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};
