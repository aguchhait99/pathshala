import React from "react";
import Layout from "../components/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useAuth } from "../context/Auth";
import TableHead from "@mui/material/TableHead";

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
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" colSpan="2" sx={{fontWeight: "bold", fontFamily: "monospace", fontSize: "20px"}}>Welcome {auth.user.name}</TableCell>
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
        </TableContainer>
      </Layout>
    </>
  );
};

export default Profile;
