import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogDetailsData, commentsData, postComments } from "../service/Api";
import Layout from "../components/Layout";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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
    // console.log("data", response);
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
  const { register, handleSubmit,setValue } = useForm();
  const [auth] = useAuth()

  const onSubmit = async (data) => {
    try {
      const response_addComent = await postComments(id, data);
      toast.success(response_addComent?.data?.message);
      getComments();
    } catch (error) {
      toast.error("Something Went Wrong");
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
        <Container>
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
                <CardMedia
                  sx={{ height: 600 }}
                  image={`${imgUrl}/api/blog/image/${id}`}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.postText}
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
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
                          {<time dateTime="2020-01-01">{(new Date(comments.createdAt)).toLocaleDateString()}</time>}
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
            <div>
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
            </div>
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
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default BlogDetails;
