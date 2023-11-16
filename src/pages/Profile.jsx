import React from "react";
import Layout from "../components/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useAuth } from "../context/Auth";
import TableHead from "@mui/material/TableHead";
import { Grid } from "@mui/material";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Layout title={"PhoenixTech-Profile"}>
        <TableContainer
          sx={{
            width: "50%",
            margin: "auto",
            marginTop: 10,
            boxShadow: "0px 0px 30px rgba(0,0,0,0.2)",
            borderRadius: 5,
          }}
        >
          
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan="2"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    fontSize: "20px",
                  }}
                >
                  Welcome {auth.user.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell align="center">{auth.user.name}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell align="center">{auth.user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Mobile
                </TableCell>
                <TableCell align="center">{auth.user.mobile}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </Grid>
          <Grid item xs={4}>
            <img src={`https://restapinodejs.onrender.com/${auth.user.photo}`} alt="No photo Found" style={{height: 250, borderRadius: "50%"}} />
          </Grid>
        </Grid>
        </TableContainer>
        
      </Layout>
    </>
  );
};

export default Profile;
