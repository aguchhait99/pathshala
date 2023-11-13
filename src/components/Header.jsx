import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import swal from "sweetalert";

const privatePage = ["Home", "About", "Courses", "Blog", "Contact"];
const publicPage = ["Home", "About", "Courses", "Blog", "Contact", "Login"];
const settings = ["Profile", "Logout"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  // Modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style_Logout = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  const sweetPop = ()=>{
    swal("Are you sure?", {
      dangerMode: true,
      buttons: {
        cancel: {
            text: "Cancel",
            value: false,
            visible: true,
        },
        confirm: {
            text: "Confirm",
            value: true,
            visible: true,
        }
    } 
    },)
    .then((value)=>{
      if(value){
        handleLogout()
      }
    })
  }

  const imgUrl = "https://restapinodejs.onrender.com";

  return (
    <>
      <AppBar position="sticky" color="grey">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#D32F2F",
                textDecoration: "none",
              }}
            >
              PhoenixTech
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {!auth.user
                  ? publicPage.map((page) => {
                      return (
                        <>
                          <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography
                              textAlign="center"
                              onClick={
                                page == "Home"
                                  ? () => navigate(`/`)
                                  : () => navigate(`/${page}`)
                              }
                            >
                              {page}
                            </Typography>
                          </MenuItem>
                        </>
                      );
                    })
                  : privatePage.map((page) => {
                      return (
                        <>
                          <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography
                              textAlign="center"
                              onClick={
                                page == "Home"
                                  ? () => navigate(`/`)
                                  : () => navigate(`/${page}`)
                              }
                            >
                              {page}
                            </Typography>
                          </MenuItem>
                        </>
                      );
                    })}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#D32F2F",
                textDecoration: "none",
              }}
            >
              PhoenixTech
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" },  }}>
              {!auth.user
                ? publicPage.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "black", display: "block", mr: 2, fontWeight: "bold", fontStyle: "italic", "&:hover": { color: "red" } }}
                      component={Link}
                      to={page == "Home" ? `/` : `/${page}`}
                    >
                      {page}
                    </Button>
                  ))
                : privatePage.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "black", display: "block", mr: 2, fontWeight: "bold", fontStyle: "italic", "&:hover": { color: "red" } }}
                      component={Link}
                      to={page == "Home" ? `/` : `/${page}`}
                    >
                      {page}
                    </Button>
                  ))}
            </Box>

            {!auth.user ? null : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={auth.user.name.toUpperCase()}
                      src={`https://restapinodejs.onrender.com/${auth.user.photo}`}
                      sx={{
                        border: "3px solid white",
                        boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
                        backgroundColor: "#0D80D8"
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={
                          setting == "Logout"
                            ? sweetPop
                            : () => navigate(`/${setting}`)
                        }
                      >
                        {setting}
                      </Typography>
                      {/* <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style_Logout}>
                        <img
                                src={"/assets/logout.png"}
                                alt=""
                                height={150}
                                style={{
                                  textAlign: "center",
                                  margin: "auto",
                                  display: "block",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              />
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            textAlign={"center"}
                          >
                            Wanna go away?
                          </Typography>
                          <Link
                            color="error"
                            onClick={handleLogout}
                            style={{
                              marginLeft: "35%",
                              textDecoration: "none",
                              color: "red",
                            }}
                          >
                            Logout
                          </Link>
                        </Box>
                      </Modal> */}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
