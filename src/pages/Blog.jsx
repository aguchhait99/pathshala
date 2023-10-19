import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  AllCategoryData,
  allBlogData,
  recentPostData,
  searchData,
} from "../service/Api";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useAuth } from "../context/Auth";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Blog = () => {
  const imgUrl = "https://restapinodejs.onrender.com";

  const [blog, setBlog] = useState([]);
  const [category, setCategory] = useState([]);
  const [recentPost, setRecentPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const getAllBlogData = async () => {
    const response = await allBlogData();
    setBlog(response?.data?.data);
    setLoading(false);
    // console.log('data', response);
  };

  const getAllCategoryData = async () => {
    const response_cat = await AllCategoryData();
    setCategory(response_cat?.data?.data);
    setLoading1(false);
    // console.log("catData", category);
  };

  const getRecentPostData = async () => {
    const response_recentPost = await recentPostData();
    setRecentPost(response_recentPost?.data?.data);
    setLoading2(false);
    // console.log("recent", response_recentPost);
  };

  // console.log("RPost", recentPost);

  useEffect(() => {
    getAllBlogData();
    getAllCategoryData();
    getRecentPostData();
  }, []);

  // Load More Data Option
  const dataPerRow = 3;
  const [loadMoreData, setLoadMoreData] = useState(dataPerRow);
  const handleMoreData = () => {
    setLoadMoreData(loadMoreData + dataPerRow);
  };

  // Search
  const [query, setQuery] = useState("");
  const handleSearch = async () => {
    const response_search = await searchData();
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);
  console.log("query", query);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "81%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  // Modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Layout title={"PhoenixTech-Blog"}>
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Grid item xs={9}>
              {loading ? (
                <>
                  <Card
                    sx={{
                      width: 800,
                      boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
                    }}
                  >
                    <CardHeader
                      title={
                        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
                      }
                      subheader={
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      }
                    />
                    <Skeleton variant="rectangular" width={900} height={400} />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
                      </Typography>
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </CardContent>
                  </Card>
                </>
              ) : (
                blog?.length > 0 &&
                blog?.slice(0, loadMoreData).map((blogs, key) => {
                  return (
                    <>
                      <Card
                        key={key}
                        sx={{
                          width: 800,
                          boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
                          mb: 4,
                        }}
                      >
                        <CardHeader
                          title={blogs.title}
                          subheader={<time dateTime="2020-01-01">{(new Date(blogs.createdAt)).toLocaleDateString()}</time>}
                        />
                        <CardMedia
                          component="img"
                          height="400"
                          image={`${imgUrl}/api/blog/image/${blogs._id}`}
                          alt="No Image Found"
                        />
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            dangerouslySetInnerHTML={{
                              __html: blogs?.postText.slice(0, 300),
                            }}
                          >
                            {/* {blogs.postText.slice(0, 300)} */}
                          </Typography>
                          {
                            !auth.user
                            ? 
                            <Link onClick={handleOpen}>Read More</Link>
                            : 
                            <Link to={`/blogdetails/${blogs._id}`}>Read More</Link>
                          }
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <img
                                src={"/assets/opps2.png"}
                                alt=""
                                height={250}
                                style={{
                                  textAlign: "center",
                                  margin: "auto",
                                  display: "block",
                                  justifyContent: "center",
                                  alignItems: "center"
                                }}
                              />
                              <Typography variant="h6"
                                id="modal-modal-description"
                                sx={{ textAlign: "center", fontFamily: "Times New Roman" }}
                              >
                                You have to login first to read more.
                              </Typography>
                              <Typography textAlign={"center"} marginTop={2}><Link
                                  to={`/login`}
                                  style={{ textDecoration: "none", color: "red", fontFamily: "Times New Roman"}}
                                >
                                  Click Here
                                </Link></Typography>
                            </Box>
                          </Modal>
                        </CardContent>
                        {/* <p dangerouslySetInnerHTML={{ __html: api1?.postText }}></p> */}
                      </Card>
                    </>
                  );
                })
              )}
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.5)", mb: 4 }}
            >
              <h3>Search</h3>
              <Search sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.2)" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  type="text"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  name="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onSubmit={handleSearch}
                />
              </Search>
              <h3>Categories</h3>
              {loading1 ? (
                <>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                </>
              ) : (
                category?.map((category, key) => {
                  return (
                    <>
                      <Grid item xs={12} key={key} sx={{ padding: 1 }}>
                        <Link
                          to={`/categorydetails/${category._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {category.category}
                        </Link>
                      </Grid>
                    </>
                  );
                })
              )}
              <h3>Recent Posts</h3>
              {loading2 ? (
                <>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginRight: "25px" }}
                  />
                </>
              ) : (
                recentPost?.map((post, key) => {
                  return (
                    <>
                      <Grid item xs={12} key={key}>
                        <Grid item xs={12} sx={{ padding: 1 }}>
                          <Link
                            to={`/blogdetails/${post._id}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontWeight: 500,
                            }}
                          >
                            {post.title}
                          </Link>
                          <Typography sx={{ color: "grey" }}>
                            {post.createdAt}
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  );
                })
              )}
            </Grid>
          </Grid>
          {loadMoreData < blog?.length && (
            <Button
              variant="contained"
              color="error"
              sx={{ margin: 2 }}
              onClick={handleMoreData}
            >
              Load More
            </Button>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Blog;
