import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  blogDetailsData,
  commentsData,
  likeCount,
  postComments,
} from "../service/Api";
import Layout from "../components/Layout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";
import { useAuth } from "../context/Auth";
import { CardHeader, IconButton, Tooltip } from "@mui/material";
import moment from "moment/moment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { FormControl  } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const navigate = useNavigate();

  const imgUrl = "https://restapinodejs.onrender.com";

  const { id } = useParams();
  //   console.log("id", id);

  //   Blog Details
  const getBlogDetailsData = async () => {
    const response = await blogDetailsData(id);
    setBlog(response?.data?.data);
    setLoading1(false);
    console.log("data", response);
  };

  //   Fecth Comments
  const getComments = async () => {
    const res_comments = await commentsData(id);
    setComment(res_comments?.data?.post?.comment?.comments);
    setLoading2(false);
    console.log("comments", res_comments?.data?.post?.comment?.comments);
  };
  const rev_comment = comment.reverse();

  //   console.log("com", comment);

  //   Post Comments
  const { register, handleSubmit } = useForm();
  const [auth] = useAuth();

  const onSubmit = async (data) => {
    try {
      const response_addComent = await postComments(id, data);
      toast.success(response_addComent?.data?.message);
      getComments();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  // Like
  const [like, setLike] = useState(true);
  const [islikeClicked, setIsLikeClicked] = useState( localStorage.getItem(`liked_${id}`) === 'true');

  const likeData = async () => {
    try {
      if(!islikeClicked){
      const res_like = await likeCount(id);
      if (res_like?.data) {
        setLike(false);
        setIsLikeClicked(true)
        localStorage.setItem(`liked_${id}`, 'true');
      } else {
        setLike(!like);
        toast.error("Already Liked")
      }
      getBlogDetailsData();
    } }catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getBlogDetailsData();
    getComments();
  }, []);

  const dataPerRow = 2;
  const [loadMoreData, setLoadMoreData] = useState(dataPerRow);
  const handleMoreData = () => {
    setLoadMoreData(loadMoreData + dataPerRow);
  };

  return (
    <>
      <Layout title={"Blog-Details"}>
        <Container sx={{ mt: 4 }}>
          {loading1 ? (
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
              <Card sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.5)" }}>
                <CardHeader
                  title={blog.title}
                  subheader={
                    <>
                      <Button variant="contained"
                                sx={{
                                  "&:hover": { backgroundColor: "orange" },
                                  backgroundColor: "orange",
                                  mt: 1,
                                  mb: 1,
                                }}>
                        <PersonIcon style={{ fontSize: "medium", paddingRight: "4px" }} /> John Doe
                      </Button>
                      <Button variant="contained"
                                sx={{
                                  "&:hover": { backgroundColor: "#ffd800" },
                                  backgroundColor: "#ffd800",
                                  mt: 1,
                                  mb: 1,
                                  ml: 2
                                }}>
                      <time>
                        <CalendarMonthIcon
                          style={{ fontSize: "medium", paddingRight: "2px", paddingTop: "2px"}}
                        />
                        {moment(blog.createdAt).format(" Do MM, YYYY")}
                      </time>
                      </Button>
                      <Button variant="contained"
                                sx={{
                                  "&:hover": { backgroundColor: "#D54B01" },
                                  backgroundColor: "#D54B01",
                                  mt: 1,
                                  mb: 1,
                                  ml: 2
                                }}>
                        <CommentIcon
                          style={{
                            fontSize: "medium",
                            paddingRight: "0.5vw",
                          }}
                        />
                        {blog.comments.length}
                      </Button>
                      <span style={{paddingLeft: "1vw"}}>

                            <Tooltip title="Like" >
                              <IconButton onClick={likeData} disabled={islikeClicked}>
                                <ThumbUpIcon sx={islikeClicked ? {color: "blue"} : {color: "grey"}}/>
                              </IconButton>
                            </Tooltip>
                          
                        {blog?.likes}
                      </span>
                    </>
                  }
                />
                <CardMedia
                  sx={{ height: 600 }}
                  image={`${imgUrl}/api/blog/image/${id}`}
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
                      __html: blog?.postText,
                    }}
                  >
                    {/* {blog.postText} */}
                  </Typography>
                </CardContent>
              </Card>
            </>
          )}
          {/* Comments */}
          <div>
            <h2>Comments ({comment.length})</h2>
            <Container>
              {rev_comment?.length > 0 &&
                rev_comment.slice(0, loadMoreData)?.map((comments, key) => {
                  return (
                    <>
                      <div style={{ padding: 7 }}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontFamily: "times new roman",
                            fontSize: 18,
                          }}
                          key={key}
                        >
                          {comments.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 12, fontFamily: "times new roman" }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {
                            <time dateTime="2020-01-01">
                              {new Date(
                                comments.createdAt
                              ).toLocaleDateString()}
                            </time>
                          }
                        </Typography>
                        <Typography
                          sx={{ fontSize: 18, fontFamily: "times new roman" }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {comments.comment}
                        </Typography>
                      </div>
                    </>
                  );
                })}
              {loadMoreData < comment?.length && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ margin: 2 }}
                  onClick={handleMoreData}
                >
                  More Comments
                </Button>
              )}
            </Container>
          </div>
        </Container>
        {/* Post Comments */}
        <Container
          sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.5)", height: "auto" }}
        >
          <h2 style={{ paddingTop: 30, paddingBottom: 15 }}>Leave a Comment</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <TextField
                label="Name"
                type="text"
                name="name"
                color="error"
                focused
                sx={{ marginLeft: 5, width: "45%" }}
                defaultValue={auth?.user?.name}
                InputProps={{
                  readOnly: true,
                }}
                {...register("name", { required: true })}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                placeholder="Don't worry!! Your mail id will remain private."
                color="error"
                focused
                sx={{ marginLeft: 5, width: "45%" }}
                defaultValue={auth?.user?.email}
                InputProps={{
                  readOnly: true,
                }}
                {...register("email", { required: true })}
              />
            <TextField
              id="outlined-multiline-flexible"
              type="text"
              multiline
              maxRows={5}
              label="Place Your Comments Here"
              name="comment"
              color="error"
              focused
              sx={{ marginLeft: 5, marginTop: 5, width: "93%" }}
              {...register("comment", { required: true })}
            />
            <Button
              type="submit"
              variant="outlined"
              color="error"
              sx={{ margin: 5 }}
            >
              Add Comment
            </Button>
            </FormControl>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default BlogDetails;
