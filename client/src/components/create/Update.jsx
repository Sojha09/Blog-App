import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataContext } from "../../context/DataProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
const Container = styled(Box)`
  margin: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "20px",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const StyledInputBase = styled(InputBase)`
  width: 70%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;
const StyledButton = styled(Button)`
  height: 40px;
  background-color: #3f51b5;
  color: white;

  &:hover {
    background-color: #303f9f;
  }
`;
const StyledTextarea = styled(TextareaAutosize)`
  width: 100%; /* Full width for textarea */
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  margin-top: 10px; /* Space above the textarea */
  resize: none; /* Prevent resizing */
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const Update = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const location = useLocation();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();

        data.append("name", file.name);
        data.append("file", file);
        console.log("data file name is", file.name);
        console.log("file data is", file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlogPost = async () => {
    let response = await API.updatePost(post);
    if (response.isSuccess) {
      navigate(`/details/${id}`);
    }
  };
  return (
    <Container>
      <Image src={url} alt="banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddCircleIcon fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <StyledInputBase
          placeholder="Title"
          value={post.title}
          onChange={(e) => handleChange(e)}
          name="title"
        />

        <StyledButton onClick={() => updateBlogPost()}>Update</StyledButton>
      </StyledFormControl>

      <StyledTextarea
        minRows={5}
        placeholder="Tell your story...."
        onChange={(e) => handleChange(e)}
        name="description"
        value={post.description}
      />
    </Container>
  );
};

export default Update;
