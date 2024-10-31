import { Grid2 } from "@mui/material";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid2 container>
        <Grid2 item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid2>
        <Grid2 container item xs={12} sm={10} lg={10}>
          <Posts />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
