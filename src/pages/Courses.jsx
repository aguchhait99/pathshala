import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getCourses } from "../service/Api";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { CardActions } from "@mui/material";

const Courses = () => {
  const [course, setCourse] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const imgUrl = "https://restapinodejs.onrender.com";

  const CourseData = async () => {
    const response = await getCourses();
    setCourse(response?.data?.Courses);
    console.log("course", course);
  };

  useEffect(() => {
    CourseData();
  }, []);

  return (
    <>
      <Layout title={"PhoenixTech-Courses"}>
        <Container>
          <Grid
            container
            spacing={0}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "flex-baseline" }}
            alignItems={{ xs: "center", md: "flex-end" }}
            sx={{ mt: 3 }}
          >
            {course?.map((element, index) => {
              return (
                <>
                  <Grid item xs={4} key={index}>
                    <Card
                      sx={{
                        maxWidth: "auto",
                        height: 500,
                        m: 2,
                        borderRadius: 4,
                        textAlign: "center"
                      }}
                    >
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
                        sx={{height: 180, width: 250, m: 4}}
                        image={`${imgUrl}/api/course/photo/${element._id}`}
                        alt="Paella dish"
                        loading="lazy"
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
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 3}}
                            onClick={
                              !auth.user
                                ? () =>
                                    swal({
                                      title: "Are you logged in?",
                                      text: "Please login first to access further.",
                                      icon: "error",
                                      dangerMode: true,
                                    })
                                : () =>
                                    navigate(
                                      `/applycourse/${element.name}/${element._id}`
                                    )
                            }
                          >
                            Apply Now
                          </Button>
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
