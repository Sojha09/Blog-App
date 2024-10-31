// import { Box, Button, TextareaAutosize, styled } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { DataContext } from "../../../context/DataProvider";
// import { API } from "../../../service/api";
// import Comment from "./Comment";

// const Container = styled(Box)`
//   margin-top: 100px;
//   display: flex;
// `;
// const Image = styled("img")({
//   borderRadius: "50%",
//   width: 50,
//   height: 50,
// });

// const StyledTextarea = styled(TextareaAutosize)`
//   height: 100px;
//   width: 100%;
//   margin: 0 20px;
// `;

// const initialValues = {
//   name: "",
//   postId: "",
//   date: new Date(),
//   comment: "", // Ensures the schema matches
// };

// const Comments = ({ post }) => {
//   const url = "https://static.thenounproject.com/png/12017-200.png";
//   const [comment, setComment] = useState(initialValues);
//   const [comments, setComments] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const { account } = useContext(DataContext);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await API.getAllComments(post._id);
//         if (response.isSuccess) {
//           setComments(response.data);
//         } else {
//           console.error("Failed to fetch comments:", response.message);
//         }
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };
//     if (post._id) {
//       getData();
//     }
//   }, [post, toggle]);

//   const handleChange = (e) => {
//     setComment({
//       ...comment,
//       name: account.username,
//       postId: post._id,
//       comment: e.target.value,
//     });
//   };

//   const addComment = async () => {
//     const response = await API.newComment(comment);
//     if (response.isSuccess) {
//       const fetchResponse = await API.getAllComments(post._id);
//       if (fetchResponse.isSuccess) {
//         setComments(fetchResponse.data);
//       }
//       setComment(initialValues);
//     } else {
//       console.error("Failed to add comment:", response.message);
//     }
//     setToggle((prevState) => !prevState);
//   };

//   return (
//     <Box>
//       <Container>
//         <Image src={url} alt="dp" />
//         <StyledTextarea
//           minRows={3}
//           placeholder="What is on your mind..."
//           value={comment.comment}
//           onChange={handleChange}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           size="medium"
//           style={{ height: 40 }}
//           onClick={addComment}
//         >
//           Post
//         </Button>
//       </Container>
//       <Box>
//         {
//           /* {comments.length > 0 &&
//           comments.map((comment) => (
//             <Comment key={comment._id} comment={comment} /> */
//           comments &&
//             comments.length > 0 &&
//             comments.map((comment) => (
//               <Comment comment={comment} setToggle={setToggle} />
//             ))
//         }
//       </Box>
//     </Box>
//   );
// };

// export default Comments;
import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;
const Image = styled("img")({
  borderRadius: "50%",
  width: 50,
  height: 50,
});

const StyledTextarea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;

const initialValues = {
  name: "",
  postId: "",
  date: new Date(),
  comment: "",
};

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";
  const [comment, setComment] = useState(initialValues);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { account } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.getAllComments(post._id);
        if (response.isSuccess) {
          setComments(response.data);
        } else {
          console.error("Failed to fetch comments:", response.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    if (post._id) {
      getData();
    }
  }, [post, toggle]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comment: e.target.value,
    });
  };

  const addComment = async () => {
    const newComment = {
      ...comment,
      date: new Date(), // Ensure current date is set
    };

    const response = await API.newComment(newComment);
    if (response.isSuccess) {
      setToggle((prevState) => !prevState); // Trigger toggle for fetching comments
      setComment(initialValues); // Reset comment input
    } else {
      console.error("Failed to add comment:", response.message);
    }
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextarea
          minRows={3}
          placeholder="What is on your mind..."
          value={comment.comment}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={addComment}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setToggle={setToggle}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
