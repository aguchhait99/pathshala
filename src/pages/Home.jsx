import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BannerData, serviceData, testimonialData } from "../service/Api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [service, setService] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const imgURL = "https://restapinodejs.onrender.com";

  // Banner
  const getBanenrData = async () => {
    const response = await BannerData();
    setBanners(response?.data?.bannerdata);
    // console.log("banner", banners);
  };

  // Service
  const getServiceData = async () => {
    const res_service = await serviceData();
    setService(res_service?.data?.data);
    // console.log("service", service);
  };

  // Testimonials
  const getTestimonial = async () => {
    const res_Testimonial = await testimonialData();
    setTestimonial(res_Testimonial?.data?.testimonials);
    console.log("testi", testimonial);
  };

  useEffect(() => {
    getBanenrData();
    getServiceData();
    getTestimonial();
  }, []);

  const bannerStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "10px",
    fontSize: "18px",
    borderTop: "5px solid red",
    width: "50%",
    mt: "20vh",
    ml: "25vw",
  };

  return (
    <div>
      <Layout title={"PhoenixTech-Home"}>
        {/* Carousel */}
        <Carousel
          showThumbs={false}
          showArrows={true}
          autoPlay={true}
          showStatus={false}
          swipeable={true}
          infiniteLoop={true}
        >
          {banners?.map((banner, index) => (
            <div key={index}>
              <img
                key={index}
                src={`${imgURL}/api/banner/photo/${banner?._id}`}
                alt="No Photo"
                height={500}
              />
              <Box sx={bannerStyle}>
                <Typography p={2} fontWeight={"bold"} fontSize={"2em"}>
                  {banner?.title}
                </Typography>
                <Typography fontSize={"1rem"}>{banner?.description}</Typography>
                <Button
                  variant="outlined"
                  sx={{ border: "2px solid red", color: "white", m: 2 }}
                >
                  Read More
                </Button>
              </Box>
            </div>
          ))}
        </Carousel>

        {/* Service */}
        <Container sx={{ bgcolor: "#F5F5F5", height: "auto" }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", pt: 4, fontWeight: "bold" }}
          >
            SERVICES
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "flex-end" }}
            alignItems={{ xs: "center", md: "flex-end" }}
            sx={{ pt: 4, pb: 4 }}
          >
            {service?.map((item, key) => {
              return (
                <>
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: "345", height: "60vh", mb: 2 }}>
                      <CardMedia
                        sx={{ height: 200 }}
                        image="/assets/Service_img.png"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          textAlign={"center"}
                          fontWeight={"bold"}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign={"center"}
                        >
                          {item.details}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Container>

        {/* TESTIMONIALS */}
        <Container sx={{ height: "auto" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center", m: 3 }}
          >
            TESTIMONIALS
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "flex-baseline" }}
            alignItems={{ xs: "center", md: "flex-end" }}
          >
            {testimonial?.map((element, index) => {
              return (
                <>
                  <Grid item xs={6} height={"auto"} width={"auto"}>
                    <Card
                      sx={{
                        Width: 345,
                        height: 250,
                        m: 2,
                        boxShadow: "0px 0px 30px rgba(0,0,0,0.3)",
                      }}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            alt="Remy Sharp"
                            src={`${imgURL}/api/testimonials/photo/${element._id}`}
                            sx={{ height: 80, width: 80 }}
                          />
                        }
                        title={element?.name}
                        subheader={element?.position}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {element?.talk}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Container>
      </Layout>
    </div>
  );
};

export default Home;
