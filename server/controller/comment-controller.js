import Comment from "../model/comment.js";
export const newComment = async (request, response) => {
  try {
    const comment = await new Comment(request.body);
    comment.save();
    response.status(200).json({ msg: "Comment Saved Successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

export const getComments = async (request, response) => {
  try {
    const comments = await Comment.find({ postId: request.params.id });

    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (request, response) => {
  try {
    const comment = await Comment.findByIdAndDelete(request.params.id);
    if (!comment) {
      return response.status(404).json({ error: "Comment not found" });
    }

    response.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    response.status(500).json({ error: error.message });
  }
};
