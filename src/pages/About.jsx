import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { teamData } from "../service/Api";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const About = () => {
  const [teams, setTeams] = useState([]);

  const imgUrl = "https://restapinodejs.onrender.com";

  const getTeamData = async () => {
    const response = await teamData();
    setTeams(response?.data?.TeamMember);
    // console.log('team', teams);
  };

  useEffect(() => {
    getTeamData();
  }, []);

  return (
    <>
      <Layout title={"PhoenixTech-About"}>
        <Container sx={{ width: "100%", color: "#D4D4D4", height: "auto", mb: 5 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              p: 3,
              color: "black",
              fontWeight: "bold",
            }}
          >
            OUR TEAMS
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            {teams?.map((element, index) => {
              return (
                <>
                  <Grid item xs={3}>
                    <Card
                      sx={{
                        maxWidth: "auto",
                        boxShadow: "0px 0px 30px rgba(0,0,0,0.3)",
                      }}
                    >
                      <CardMedia
                        sx={{ height: 400 }}
                        image={`${imgUrl}/api/team/photo/${element._id}`}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          textAlign={"center"}
                        >
                          {element.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign={"center"}
                        >
                          {element.possession}
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
    </>
  );
};

export default About;
