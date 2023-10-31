import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { categoryDetailsData } from "../service/Api";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Layout from "../components/Layout";
import { useAuth } from "../context/Auth";
import swal from "sweetalert";
import moment from "moment/moment";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const CategoryDetails = () => {
  const imgUrl = "https://restapinodejs.onrender.com";
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  const { id } = useParams();

  const navigate = useNavigate();

  const getCategoryDetails = async () => {
    const response = await categoryDetailsData(id);
    setCategory(response?.data?.data);
    setLoading(false);
    console.log("cat", response);
  };

  useEffect(() => {
    getCategoryDetails();
  }, []);

  const sweetPopup = ()=>{
    swal({
      title: "No Data Found",
      text: " ",
      icon: "warning",
      dangerMode: true,
      buttons: false,
      onclick: navigate('/blog'),
      timer:3000
    })
  }

  // Load More Data Option
  const dataPerRow = 2;
  const [loadMoreData, setLoadMoreData] = useState(dataPerRow);
  const handleMoreData = () => {
    setLoadMoreData(loadMoreData + dataPerRow);
  };

  return (
    <>
      <Layout title={"Category-Details"}>
        <Container sx={{mt: 5}}>
          {loading ? (
            <>
              <Card
                sx={{
                  boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
                }}
              >
                <CardHeader
                  title={<Skeleton variant="text" sx={{ fontSize: "3rem" }} />}
                  subheader={
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  }
                />
                <Skeleton variant="rectangular" height={400} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
                  </Typography>
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </CardContent>
              </Card>
            </>
          ) : !category.length > 0 ? (
            sweetPopup()
          ) : (
            <>
              {category?.length > 0 &&
                category?.slice(0, loadMoreData).map((category, key) => {
                  return (
                    <>
                      <Card
                        key={key}
                        sx={{
                          boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
                          mb: 4,
                        }}
                      >
                        <CardHeader
                          title={category.title}
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
                                  {moment(category.createdAt).format(
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
                                {category.comments.length}
                              </Button>
                            </>
                          }
                        />
                        <CardMedia
                          component="img"
                          height="400"
                          image={`${imgUrl}/api/blog/image/${category._id}`}
                          alt="No Image Found"
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{
                              __html: category?.postText.slice(0, 300),
                            }}>
                            {/* {category.postText.slice(0, 300)} */}
                          </Typography>
                          {!auth.user ? (
                            <Link onClick={()=>swal({
                              title: "Are you logged in?",
                              text: "Please login first to access further.",
                              icon: "error",
                              dangerMode: true,
                            })}>
                              <Button variant="contained" color="warning">
                              Read More
                              </Button>
                            </Link>
                          ) : (
                            <Link to={`/blogdetails/${category._id}`} style={{textDecoration: "none", color: "blue"}}>
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
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => navigate(-1)}
                sx={{ margin: 2 }}
              >
                Go Back
              </Button>
            </>
          )}
          {loadMoreData < category?.length && (
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

export default CategoryDetails;
