import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AllCategoryData, allBlogData, recentPostData } from "../service/Api";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useAuth } from "../context/Auth";
import swal from "sweetalert";
import moment from "moment/moment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CommentIcon from "@mui/icons-material/Comment";
import Pagnition from "./Paginations/Pagnition";

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

  // Pagination 

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 2
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = blog.slice(firstIndex, lastIndex)
  const page = Math.ceil(blog.length / recordsPerPage)

  const handlePageChange = (event, newPage) =>{
    setCurrentPage(newPage)
  }


  // Search
  const [searchItem, setSearchItem] = useState("");

  const handleSearch = () => {
    const encodedItem = encodeURIComponent(searchItem);
    navigate(`/searchpage/${encodedItem}`);
    setSearchItem("");
  };

  return (
    <>
      <Layout title={"PhoenixTech-Blog"}>
        <Container sx={{ mt: 4 }}>
          <Grid
            container
            spacing={0}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Grid item xs={9} pr={3}>
              {loading ? (
                <>
                  <Card
                    sx={{
                      width: "auto",
                      boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
                      mb: 4
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
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={400}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
                      </Typography>
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </CardContent>
                  </Card>
                  <Card
                    sx={{
                      width: "auto",
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
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={400}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
                      </Typography>
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </CardContent>
                  </Card>
                </>
              ) : (
                records.map((blogs, key) => {
                  return (
                    <>
                      <Card
                        key={key}
                        sx={{
                          width: "auto",
                          boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
                          mb: 4,
                        }}
                      >
                        <CardHeader
                          title={blogs.title}
                          subheader={
                            <>
                              <Button
                                variant="contained"
                                sx={{
                                  "&:hover": { backgroundColor: "orange" },
                                  backgroundColor: "orange",
                                  mt: 1,
                                  mb: 1,
                                }}
                              >
                                <PersonIcon
                                  style={{
                                    fontSize: "medium",
                                    paddingRight: "5px",
                                  }}
                                />{" "}
                                John Doe
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  "&:hover": { backgroundColor: "#ffd800" },
                                  backgroundColor: "#ffd800",
                                  mt: 1,
                                  mb: 1,
                                  ml: 1,
                                }}
                              >
                                <time>
                                  <CalendarMonthIcon
                                    style={{
                                      fontSize: "medium",
                                      paddingRight: "2px",
                                    }}
                                  />
                                  {moment(blogs.createdAt).format(
                                    " Do MM, YYYY"
                                  )}
                                </time>
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  "&:hover": { backgroundColor: "#D54B01" },
                                  backgroundColor: "#D54B01",
                                  mt: 1,
                                  mb: 1,
                                  ml: 1,
                                }}
                              >
                                <CommentIcon
                                  style={{
                                    fontSize: "medium",
                                    paddingTop: "2px",
                                    paddingRight: "5px",
                                  }}
                                />
                                {blogs.comment_count}
                              </Button>
                            </>
                          }
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
                          {!auth.user ? (
                            <Link
                              onClick={() =>
                                swal({
                                  title: "Are you logged in?",
                                  text: "Please login first to access further.",
                                  icon: "error",
                                  dangerMode: true,
                                })
                              }
                              style={{ textDecoration: "none", color: "blue" }}
                            >
                              <Button variant="contained" color="warning">
                                Read More
                              </Button>
                            </Link>
                          ) : (
                            <Link
                              to={`/blogdetails/${blogs._id}`}
                              style={{ textDecoration: "none", color: "blue" }}
                            >
                              <Button variant="contained" color="warning">
                                Read More
                              </Button>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    </>
                  );
                })
              )}
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.5)", mb: 4, p: 2 }}
            >
              <h3>Search</h3>
              <TextField
                name="search"
                type="text"
                placeholder="Search"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                margin="0"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
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
                          {category.category}{" "}
                          <span style={{ color: "grey", marginLeft: "10px" }}>
                            {category.category.length}
                          </span>
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
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  {recentPost?.map((post, key) => {
                    return (
                      <>
                        <Grid item xs={4} sx={{ padding: 1 }}>
                          <img
                            src={`${imgUrl}/api/blog/image/${post._id}`}
                            alt=""
                            height={"100%"}
                            width={"100%"}
                          />
                        </Grid>
                        <Grid item xs={8} sx={{ padding: 1 }}>
                          <Link
                            to={`/blogdetails/${post._id}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontWeight: 500,
                            }}
                            className="recentPostLink"
                          >
                            {post.title}
                          </Link>
                          <Typography sx={{ color: "grey", fontSize: "small" }}>
                            <time>
                              {moment(post.createdAt).format(
                                " Do MM, YYYY, h:mm a"
                              )}
                            </time>
                          </Typography>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Load More Start */}

          {/* {loadMoreData < blog?.length && (
            <>
              <Button
                variant="contained"
                color="error"
                sx={{ mb: 2 }}
                onClick={handleMoreData}
              >
                Load More
              </Button>
            </>
          )} */}
          {/* Load More End */}

          {/* Pagination Start */}
            <Pagnition count={page} onChange={handlePageChange}/>
          {/* Pagination End */}
        </Container>
      </Layout>
    </>
  );
};

export default Blog;
