import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";

import Content from "../components/Content";

import Logo from "../assets/svgs/Logo";
import { DrawerData } from "../sources/DrawerData";

const drawerWidth = 270;

const Main = (props) => {
  const currentPath = useLocation();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //! Need to edit when initialize the project
  const functionName = "Machine Management System";
  const functionPath = "/machine";

  const drawer = (
    <div>
      <Grid container sx={{ mt: "30px" }}>
        <Grid item container sx={{ mx: "10px" }}>
          <Grid item xs={3}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Logo style={{ width: "55px", height: "55px" }} />
            </Link>
          </Grid>
          <Grid item xs={9}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: "30px",
                  color: "white",
                  fontFamily: "Arvo",
                  fontWeight: "bold",
                }}
              >
                Gold Buds Uva Tea
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid>
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontFamily: "Arvo",
              fontWeight: "bold",
              textAlign: "center",
              mt: "15px",
            }}
          >
            {functionName}
          </Typography>
        </Grid>
      </Grid>
      <List sx={{ mt: "30px" }}>
        {DrawerData.map((item, index) => (
          <Link
            key={`${item.path}`}
            to={`${functionPath}/${item.path}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem key={item.title}>
              <Button
                variant="contained"
                sx={{
                  width: "250px",
                  height: "40px",
                  borderRadius: "15px",
                  justifyContent: "left",
                  pl: "25px",
                  bgcolor:
                    currentPath.pathname === `${functionPath}/${item.path}`
                      ? "#B8BCBF"
                      : "white",
                  "&:hover": {
                    bgcolor: "#B8BCBF",
                  },
                }}
              >
                <Typography
                  sx={{ color: "black", fontSize: "16px" }}
                  textTransform="capitalize"
                  fontFamily="arvo"
                  fontWeight="bold"
                >
                  {item.title}
                </Typography>
              </Button>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", bgcolor: "#1C1C25" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" },
        }}
      >
        <Toolbar sx={{ bgcolor: "#2F2F3D" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {functionName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          bgcolor: "#1C1C25",
          height: "100vh",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#2F2F3D",
              boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#2F2F3D",
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.3)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }} />
        <Content />
      </Box>
    </Box>
  );
};

export default Main;
