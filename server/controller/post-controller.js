// import Post from "../model/post.js";

// export const createPost = async (request, response) => {
//   try {
//     const post = await new Post(request.body);
//     post.save();

//     return response.status(200).json("Post Saved SuccessFully");
//   } catch (error) {
//     return response.status(500).json(error);
//   }
// };

import Post from "../model/post.js";

export const createPost = async (request, response) => {
  try {
    const { picture, ...postData } = request.body; // Destructure the incoming data

    // Ensure the picture is an object and extract the URL
    let pictureUrl = "";
    if (typeof picture === "object" && picture.imageUrl) {
      pictureUrl = picture.imageUrl; // Get the imageUrl from the object
    } else {
      // Handle case where picture is not in expected format
      return response.status(400).json({ error: "Invalid picture format" });
    }

    // Create a new post instance
    const post = new Post({
      ...postData,
      picture: pictureUrl, // Set picture to the extracted URL
    });

    // Save the post
    await post.save();

    return response.status(200).json("Post Saved Successfully");
  } catch (error) {
    console.error("Error saving post:", error);
    return response.status(500).json({ error: "Failed to save post" });
  }
};

export const getAllPosts = async (request, response) => {
  let category = request.query.category;
  let posts;

  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }

    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      return response.status(400).json({ msg: "post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    return response.status(200).json({ msg: "post updated Successfully" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

export const deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return response.status(404).json({ error: "Post not found" });
    }

    return response.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return response.status(500).json({ error: error.message });
  }
};
