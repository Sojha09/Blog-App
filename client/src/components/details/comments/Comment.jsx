import { Delete } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;
const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
`;
const StyleDate = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;
const DeleteIcon = styled(Delete)`
  margin-left: auto;
  cursor: pointer;
`;

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const removeComment = async () => {
    try {
      const response = await API.deleteComment(comment._id);
      if (response.message === "Comment deleted successfully") {
        setToggle((prevState) => !prevState);
      } else {
        console.error("Failed to delete comment:", response.error); // Log failure response
      }
    } catch (error) {
      console.error("Error deleting comment:", error); // Handle potential errors
    }
  };

  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyleDate> {new Date(comment.date).toDateString()}</StyleDate>
        {comment.name === account.username && (
          <DeleteIcon onClick={() => removeComment()} />
        )}
      </Container>

      <Box>
        <Typography>{comment.comment}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
