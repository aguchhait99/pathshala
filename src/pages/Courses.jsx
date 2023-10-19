import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getCourses } from "../service/Api";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { useAuth } from "../context/Auth";
import { useNavigate, Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


const Courses = () => {
  const [course, setCourse] = useState([]);
  const [auth] = useAuth()
  const navigate = useNavigate()
  const imgUrl = "https://restapinodejs.onrender.com";

  const CourseData = async () => {
    const response = await getCourses();
    setCourse(response?.data?.Courses);
    console.log("course", course);
  };

  useEffect(() => {
    CourseData();
  }, []);

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
      <Layout title={"PhoenixTech-Courses"}>
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mt: 3 }}
          >
            {course?.map((element, index) => {
              return (
                <>
                  <Grid item xs={4} key={index}>
                    <Card sx={{ width: 345, height: 450, m: 2, borderRadius: 4 }}>
                      <CardHeader
                        sx={{
                          backgroundColor: "red",
                          height: 15,
                          textAlign: "center",
                          color: "white",
                        }}
                        title={element.name}
                      />
                      <CardMedia
                        component="img"
                        height="200"
                        width="50"
                        image={`${imgUrl}/api/course/photo/${element._id}`}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography
                          variant="h4"
                          color="text.secondary"
                          sx={{ textAlign: "center", color: "red" }}
                        >
                          ₹ {element.fees} /-
                        </Typography>
                        <Typography
                          color="text.secondary"
                          sx={{ textAlign: "center" }}
                        >
                          * Requirement: {element.requirement}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          sx={{ textAlign: "center" }}
                        >
                          * Duration: {element.duration}
                        </Typography>
                        <Button variant="contained" color="error" sx={{m: 2, ml: "6vw"}}
                        onClick={!auth.user ? handleOpen : ()=> navigate(`/applycourse/${element._id}`)}
                        >
                          Apply Now
                        </Button>
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
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Courses;
