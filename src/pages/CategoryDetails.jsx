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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useAuth } from "../context/Auth";

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

  // Load More Data Option
  const dataPerRow = 2;
  const [loadMoreData, setLoadMoreData] = useState(dataPerRow);
  const handleMoreData = () => {
    setLoadMoreData(loadMoreData + dataPerRow);
  };

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
    boxShadow: 24,
    p: 4,
  };

  const style_NoData = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  return (
    <>
      <Layout title={"Category-Details"}>
        <Container>
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
            <Modal
              open={true}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style_NoData}>
                <img
                  src={"/assets/sad.png"}
                  alt=""
                  height={150}
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  textAlign={"center"}
                >
                  No Data Found
                </Typography>
                <Link
                  color="error"
                  onClick={() => navigate(-1)}
                  style={{marginLeft: "35%", textDecoration: "none", color: "red"}}
                >
                  Go Back
                </Link>
              </Box>
            </Modal>
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
                          subheader={category.createdAt}
                        />
                        <CardMedia
                          component="img"
                          height="400"
                          image={`${imgUrl}/api/blog/image/${category._id}`}
                          alt="No Image Found"
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {category.postText.slice(0, 300)}
                          </Typography>
                          {!auth.user ? (
                            <Link onClick={handleOpen}>Read More</Link>
                          ) : (
                            <Link to={`/blogdetails/${category._id}`}>
                              Read More
                            </Link>
                          )}
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
                                  alignItems: "center",
                                }}
                              />
                              <Typography
                                variant="h6"
                                id="modal-modal-description"
                                sx={{
                                  textAlign: "center",
                                  fontFamily: "Times New Roman",
                                }}
                              >
                                You have to login first to read more.
                              </Typography>
                              <Typography textAlign={"center"} marginTop={2}>
                                <Link
                                  to={`/login`}
                                  style={{
                                    textDecoration: "none",
                                    color: "red",
                                    fontFamily: "Times New Roman",
                                  }}
                                >
                                  Click Here
                                </Link>
                              </Typography>
                            </Box>
                          </Modal>
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
