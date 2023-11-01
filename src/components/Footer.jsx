import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAuth } from "../context/Auth";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';

const Footer = () => {
  const privatePage = ["Home", "About", "Courses", "Blog", "Contact"];
  const publicPage = ["Home", "About", "Courses", "Blog", "Contact", "Login"];
  const services = ["Web Design", "Web Development", "Product Management", "Marketing", "Graphic Design"]
  const [auth] = useAuth();
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "#1E1E1E", height: "auto", mt: 2 }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "center", md: "flex-end" }}
          
        >
          <Grid item xs={3} sx={{mt: 2}}>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center",}}
            >
              PhoenixTech
            </Typography>
            <Box width={"50%"} m={"auto"}>
            <Typography sx={{ color: "white", }}>
              Eco Intelligent Park, Unit No- 7E, 7th Floor, Block- EM, Plot-9,
              Salt Lake Sector-5, Kolkata 700091, India
            </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{mt: 2}}>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              Useful Links
            </Typography>
            <List sx={{m: "auto"}}>
              {!auth.user
                ? publicPage?.map((page) => {
                    return (
                      <>
                        <Box width={"50%"} m={"auto"}>
                        <ListItem sx={{}}>
                          <ListItemIcon>
                            <ArrowForwardIosIcon
                              sx={{ color: "red", textAlign: "center" }}
                            />
                          </ListItemIcon>
                          <Link style={{textDecoration: "none", }} to={page=="Home" ? ('/') : (`/${page}`)}>
                          <ListItemText
                            primary={page}
                            sx={{ color: "white" }}
                          />
                          </Link>
                        </ListItem>
                        </Box>
                      </>
                    );
                  })
                : privatePage?.map((page) => {
                    return (
                      <>
                      <Box width={"50%"} m={"auto"}>
                        <ListItem>
                          <ListItemIcon>
                            <ArrowForwardIosIcon
                              sx={{ color: "red", textAlign: "center" }}
                            />
                          </ListItemIcon>
                          <Link style={{textDecoration: "none", }} to={page=="Home" ? ('/') : (`/${page}`)}>
                          <ListItemText
                            primary={page}
                            sx={{ color: "white" }}
                          />
                          </Link>
                        </ListItem>
                        </Box>
                      </>
                    );
                  })}
            </List>
          </Grid>
          <Grid item xs={3} sx={{mt: 2}}>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              Our Services
            </Typography>
            <List sx={{m: "auto"}}>
              {
                services?.map((service)=>{
                  return (
                    <>
                    <Box width={"65%"} m={"auto"}>
                      <ListItem>
                          <ListItemIcon>
                            <ArrowForwardIosIcon
                              sx={{ color: "red", textAlign: "center" }}
                            />
                          </ListItemIcon>
                          <Link style={{textDecoration: "none", }} to={`/${service}`}>
                          <ListItemText
                            primary={service}
                            sx={{ color: "white" }}
                          />
                          </Link>
                        </ListItem>
                        </Box>
                    </>
                  )
                })
              }
            </List>
          </Grid>
          <Grid item xs={3} sx={{mt: 2}}>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              Join Our Newsletter
            </Typography>
            <Typography align={"center"} color={"white"} mt={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, doloremque?
            </Typography>
            <ButtonGroup sx={{ mt: 2, pl: 3, mb: 2, alignContent: "center"}} m={"auto"}>
            <TextField id="outlined-basic" variant="outlined" sx={{backgroundColor: "white", borderRadius: "10px 0px 0px 10px", width: "auto"}}/>
            <Button variant="contained" color="error" sx={{borderRadius: "0px 10px 10px 0px", pt: 2, pb: 2}}>Submit</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        </Container>
    </>
  );
};

export default Footer;
