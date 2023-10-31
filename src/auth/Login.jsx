import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";
import { loginData } from "../service/Api";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("logging");
    const response = await loginData({
      email,
      password,
    });
    setLoading("");
    console.log("data", response);
    if (response) {
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      navigate("/");
      toast.success(response?.data?.message);
      localStorage.setItem("auth", JSON.stringify(response.data));
    } else {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Layout title={"PhoenixTech-Login"}>
        <Container
          sx={{
            marginTop: "5%",
            boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
            borderRadius: "20px",
            mb: 10
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 6 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "flex-end" }}
            alignItems={{ xs: 'center',  }}
            sx={{pb: 3, mb: 3}}
          >
            <Grid item xs={4} width={"auto"}>
              <img
                src="/assets/login_bg.png"
                alt=""
                alignItems={{ xs: 'center',  }}
                style={{ height: "40vh" }}
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
                LOGIN HERE
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
                    <InputLabel>Email</InputLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel>Password</InputLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      "Login"
                    )}
                  </Button>
                  <div style={{ textAlign: "center" }}>
                    Don't have any account?{" "}
                    <Link
                      to="/register"
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: "#C62828",
                      }}
                    >
                      {" "}
                      REGISTER HERE
                    </Link>
                  </div>
                </FormGroup>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Login;
