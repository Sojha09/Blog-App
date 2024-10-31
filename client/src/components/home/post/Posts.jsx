import React, { useEffect, useState } from "react";
import { API } from "../../../service/api";
import { useSearchParams, Link } from "react-router-dom";
import { Box, Grid2 } from "@mui/material";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getAllPosts({ category: category || "" });
        if (response.isSuccess) {
          setPosts(response.data);
        } else {
          console.error("Error response:", response);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid2 item lg={3} sm={4} xs={12}>
            <Link
              to={`details/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post post={post} />
            </Link>
          </Grid2>
        ))
      ) : (
        <Box style={{ color: "#878787", margin: "300px 800px", fontSize: 18 }}>
          No Data Available To Display
        </Box>
      )}
    </>
  );
};

export default Posts;
