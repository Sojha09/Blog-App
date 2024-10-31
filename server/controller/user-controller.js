import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/server.js";
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    // const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(request.body.password, 15);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    // Add any validation logic here (e.g., using express-validator)

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "Signup Successful" });
  } catch (error) {
    console.error("Error during signup:", error); // Log error details

    // Handle specific error types
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return response.status(400).json({ msg: "Username already exists" });
    }

    return response.status(500).json({
      msg: "Error while signing up the user",
      error: error.message || "An unexpected error occurred",
    });
  }
};

// export const loginUser = async (request, response) => {
//   let user = await User.findOne({ username: request.body.username });
//   console.log("User found:", user);

//   if (!user) {
//     console.log("No user found with that username");

//     return response.status(400).json({ msg: "Username does not match" });
//   }

//   try {
//     let match = await bcrypt.compare(request.body.password, user.password);
//     console.log("Password match result:", match);

//     if (match) {
//       const accessToken = jwt.sign(
//         user.toJSON(),
//         process.env.ACCESS_SECRET_KEY,
//         { expiresIn: "15m" }
//       );
//       const refreshToken = jwt.sign(
//         user.toJSON(),
//         process.env.REFRESH_SECRET_KEY
//       );

//       const newToken = new Token({ token: refreshToken });
//       await newToken.save();

//       return response.status(200).json({
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//         name: user.name,
//         username: user.username,
//       });
//     } else {
//       console.log("Password does not match");
//       response.status(400).json({ msg: "Password Does Not Match" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error); // Log the full error object
//     return response.status(500).json({
//       msg: "Error while login user",
//       error: error.message || "An unexpected error occurred",
//     });
//   }
// };

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  console.log("User found:", user);

  if (!user) {
    console.log("No user found with that username");
    return response.status(400).json({ msg: "Username does not match" });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    console.log("Password match result:", match);

    if (match) {
      const accessToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      console.log("Password does not match");
      return response.status(400).json({ msg: "Password Does Not Match" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return response.status(500).json({
      msg: "Error while login user",
      error: error.message || "An unexpected error occurred",
    });
  }
};
