import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { allBlogData } from "../service/Api";
import Container from "@mui/material/Container";
import Layout from "../components/Layout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import moment from "moment/moment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CommentIcon from "@mui/icons-material/Comment";
import CardHeader from "@mui/material/CardHeader";
import { useAuth } from "../context/Auth";
import swal from "sweetalert";

const SearchPage = () => {
  const { encodedItem } = useParams();
  const searchItem = decodeURIComponent(encodedItem);
  //   console.log(searchItem);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  const imgUrl = "https://restapinodejs.onrender.com";

  const [auth] = useAuth()

  // console.log('auth', auth);

  const getBlog = async () => {
    const response = await allBlogData();
    setBlog(response?.data?.data);
    setLoading(false);
    // console.log("ac", response?.data?.data);
  };

  useEffect(() => {
    getBlog();
  }, []);

  console.log("data", blog);

  const result = blog.filter((blogs) => {
    const searchItemLower = searchItem.toLowerCase();
    const titleLower = blogs.title.toLowerCase();
    const categoryLower = blogs.category.toLowerCase();
    const text = blogs.postText.replace(/<[^>]*>/g, "");
    const textLower = text.toLowerCase();

    return (
      titleLower.includes(searchItemLower) ||
      categoryLower.includes(searchItemLower) ||
      textLower.includes(searchItemLower)
    );
  });

  console.log("res", result);
  return (
    <>
      <Layout title={"Search Page"}>
        <Container sx={{ mt: 4 }}>
          {loading ? (
            <>
              <Card sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.5)" }}>
                <Skeleton variant="rectangular" width={"auto"} height={600} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  </Typography>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {result?.map((blog, key) => {
                return (
                  <>
                    <Card sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.5)", mb: 4 }} key={key}>
                      <CardHeader
                        title={blog.title}
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
                                  paddingRight: "4px",
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
                                ml: 2,
                              }}
                            >
                              <time>
                                <CalendarMonthIcon
                                  style={{
                                    fontSize: "medium",
                                    paddingRight: "2px",
                                    paddingTop: "2px",
                                  }}
                                />
                                {moment(blog.createdAt).format(" Do MM, YYYY")}
                              </time>
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                "&:hover": { backgroundColor: "#D54B01" },
                                backgroundColor: "#D54B01",
                                mt: 1,
                                mb: 1,
                                ml: 2,
                              }}
                            >
                              <CommentIcon
                                style={{
                                  fontSize: "medium",
                                  paddingRight: "0.5vw",
                                }}
                              />
                              {blog.comments.length}
                            </Button>
                          </>
                        }
                      />
                      <CardMedia
                        sx={{ height: 600 }}
                        image={`${imgUrl}/api/blog/image/${blog._id}`}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {blog.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          dangerouslySetInnerHTML={{
                            __html: blog?.postText.slice(0, 400),
                          }}
                        >
                          {/* {blog.postText} */}
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
                              <Button variant="contained" color="warning">Read More</Button>
                            </Link>
                          ) : (
                            <Link
                              to={`/blogdetails/${blog._id}`}
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
              })}
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default SearchPage;
