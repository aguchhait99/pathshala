import React from "react";
import Layout from "../components/Layout";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { contactData } from "../service/Api";
import swal from 'sweetalert';
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await contactData(data)
      swal({
        title: (response?.data?.message),
        text: " ",
        icon: "success",
        dangerMode: true,
      })
    } catch (error) {
      swal({
        title: "Something Went Wrong",
        text: " ",
        icon: "error",
        dangerMode: true,
      })
    }
  };
  return (
    <>
      <Layout title={"PhoenixTech-Contact"}>
        {/* Map */}
        <Container maxWidth="xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1039987526487!2d88.42485957475722!3d22.575213332875617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275927b0061ad%3A0x496c2fab98874c86!2sWebskitters%20Technology%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1697779293665!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Container>

        {/* Address */}
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "flex-end" }}
            alignItems={{ xs: "center", }}
            m={5}
            sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.5)" }}
          >
            <Grid item xs={4} p={4}>
              <Typography variant="h6" fontWeight="bold">
                <LocationOnIcon fontSize="large" /> Location
              </Typography>
              <Typography>
                Eco Intelligent Park, Unit No- 7E, 7th Floor, Block- EM, Plot-9,
                Salt Lake Sector-5, Kolkata 700091, India
              </Typography>
            </Grid>
            <Grid item xs={4} p={4}>
              <Typography variant="h5" fontWeight="bold">
                <EmailIcon fontSize="Large" />
                Email
              </Typography>
              <Typography>info@example.com</Typography>
              <Typography>contact@example.com</Typography>
            </Grid>
            <Grid item xs={4} p={4}>
              <Typography variant="h5" fontWeight="bold">
                <CallIcon fontSize="large" /> Call
              </Typography>
              <Typography>+1 5589 55488 51</Typography>
              <Typography>+1 5589 22475 14</Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Contact Form */}
        <Container
          sx={{ boxShadow: "0px 0px 30px rgba(0,0,0,0.5)", height: "auto", mb: 5 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                label="Name"
                type="text"
                name="name"
                color="error"
                focused
                sx={{ marginLeft: 2, marginTop: 5, width: "45%" }}
                {...register("name", { required: true })}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                placeholder="Don't worry!! Your mail id will remain private."
                color="error"
                focused
                sx={{ marginLeft: 2, marginTop: 5, width: "45%" }}
                {...register("email", { required: true })}
              />
            </div>
            <TextField
                label="Phone Number"
                type="number"
                name="phone"
                color="error"
                focused
                sx={{ marginLeft: 2, marginTop: 5, width: "93%" }}
                {...register("phone", { required: true })}
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
              sx={{ marginLeft: 2, marginTop: 5, width: "93%" }}
              {...register("message", { required: true })}
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ margin: 2 }}
            >
              Message
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default Contact;
