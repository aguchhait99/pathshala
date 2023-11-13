import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/Auth";
import { registerData } from "../service/Api";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const Register = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("logging");
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('mobile', formData.mobile);
    formDataToSend.append('photo', formData.photo);
    const response = await registerData(formDataToSend);
    if (response) {
      navigate("/");
      console.log("reg", response.data);
      toast.success(response?.data?.message);
    } else {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Layout title={"PhoenixTech-Register"}>
        <Container
          sx={{
            marginTop: "5%",
            boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
            borderRadius: "20px",
            mb: "5%"
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 6 }}
          >
            <Grid item xs={4} width={"auto"}>
              <img
                src="/assets/register_img.jpg"
                alt=""
                style={{ margin: "30% 0% 20% 10%", height: "45vh" }}
              />
            </Grid>
            <Grid item xs={8} width={"auto"}>
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#C62828",
                  fontSize: "30px",
                  marginTop: 30,
                }}
              >
                REGISTER HERE
              </h3>
              <form onSubmit={handleSubmit}>
                <FormGroup
                  sx={{
                    width: "auto",
                    marginLeft: 10,
                    paddingTop: 2,
                    paddingLeft: 5,
                    paddingRight: 15,
                  }}
                >
                  <FormControl sx={{ paddingBottom: 2 }}>
                    <InputLabel>Name</InputLabel>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ paddingBottom: 2 }}>
                    <InputLabel>Email</InputLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ paddingBottom: 2 }}>
                    <InputLabel>Mobile</InputLabel>
                    <Input
                      type="number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ paddingBottom: 2 }}>
                    <InputLabel>Password</InputLabel>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel>Image</InputLabel>
                    <Input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      // ref={{ ...register("photo") }}
                      required
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 5, mb: 2 }}
                    type="submit"
                  >
                    {loading === "logging" ? (
                      <>
                        <CircularProgress
                          sx={{ color: "white", marginRight: 1 }}
                          size={"1rem"}
                        />
                        Processing ...
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </FormGroup>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Register;
