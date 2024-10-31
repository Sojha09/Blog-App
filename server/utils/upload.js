import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

import dotenv from "dotenv";

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb://${username}:${password}@blog-app-shard-00-00.wbyun.mongodb.net:27017,blog-app-shard-00-01.wbyun.mongodb.net:27017,blog-app-shard-00-02.wbyun.mongodb.net:27017/?ssl=true&replicaSet=atlas-fpo9wb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,

  file: (request, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      console.log("File uploded ", file.originalname);
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
// import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// import dotenv from "dotenv";

// dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//   url: `mongodb://${username}:${password}@blog-app-shard-00-00.wbyun.mongodb.net:27017,blog-app-shard-00-01.wbyun.mongodb.net:27017,blog-app-shard-00-02.wbyun.mongodb.net:27017/?ssl=true&replicaSet=atlas-fpo9wb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,

//   file: (request, file) => {
//     const match = ["image/png", "image/jpg", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       console.log("File uploaded (unsupported type):", file.originalname);
//       return {
//         bucketName: "photos", // Ensure this is set for unsupported types too
//         filename: `${Date.now()}-blog-${file.originalname}`, // Generate a unique filename
//       };
//     }

//     console.log("File uploaded:", file.originalname);
//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-blog-${file.originalname}`,
//     };
//   },
// });

// export default multer({ storage });
