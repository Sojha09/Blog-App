import { Box, styled, Typography, Button } from "@mui/material";
import React from "react";
import { addElipsis } from "../../../utils/common-utils";

// Styled components for layout and design
const MainContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  padding: 0 40px; // Adds some padding around the container
`;

const Sidebar = styled(Box)`
  width: 25%; // Sets the width of the sidebar
  padding: 20px;
  border-right: 1px solid #ddd;
  height: 100vh; // Makes the sidebar full-height
`;

const ContentContainer = styled(Box)`
  width: 70%; // Ensures the content takes up the rest of the space
  padding: 20px;
`;

const CreateBlogButton = styled(Button)`
  background-color: #3f51b5;
  color: white;
  width: 100%;
  margin-bottom: 20px;

  &:hover {
    background-color: #303f9f;
  }
`;

const CategoryList = styled(Box)`
  margin-top: 20px;

  & > Typography {
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
      color: #3f51b5;
    }
  }
`;

const PostCard = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PostImage = styled("img")`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const PostInfo = styled(Box)`
  padding: 10px 15px;
`;

const PostCategory = styled(Typography)`
  font-size: 14px;
  color: #888;
`;

const PostTitle = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 5px;
`;

const PostUsername = styled(Typography)`
  font-size: 14px;
  color: #333;
  margin-top: 5px;
`;

const PostDescription = styled(Typography)`
  font-size: 15px;
  color: #555;
  margin-top: 10px;
`;

const Post = ({ post }) => {
  return (
    <PostCard>
      <PostImage src={post.picture} alt="blog" />
      <PostInfo>
        <PostCategory>{post.categories}</PostCategory>
        <PostTitle>{addElipsis(post.title, 20)}</PostTitle>
        <PostUsername>By {post.username}</PostUsername>
        <PostDescription>{addElipsis(post.description, 100)}</PostDescription>
      </PostInfo>
    </PostCard>
  );
};
export default Post;
