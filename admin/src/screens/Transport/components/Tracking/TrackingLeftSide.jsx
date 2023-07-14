import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SearchIcon from "@mui/icons-material/SearchRounded";

import { Theme } from "../../utils/Theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import Truck from "./Truck";
import axios from "axios";

const showTags = [{ name: "All", count: 2 }];

const TrackingLeftSide = ({ routes, setRoutes, setSelectedRoute }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  // const [routes, setRoutes] = useState([]);

  const handleClick = (index) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  useEffect(() => {
    setSelectedRoute(routes[clickedIndex]);
  }, [clickedIndex]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8082/route")
  //     .then((response) => {
  //       setRoutes(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <Grid
      container
      item
      md={5.5}
      sx={{
        overflowY: "scroll",
        height: "100%",
        maxHeight: "100vh",
        "&::-webkit-scrollbar": { width: 0, height: 0 },
      }}
    >
      <Box p="20px" bgcolor={Theme.palette.background.secondary} height="100%">
        <Grid container item md={12}>
          <Grid item id="title" md={12}>
            <Box display="flex" justifyContent="space-between">
              <Typography color={Theme.palette.text.primary} fontSize="25px">
                Tracking
              </Typography>
              {/* <Box id="boxbox" justifyContent="center" alignSelf="center"> */}
              <IconButton>
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
              {/* </Box> */}
            </Box>
          </Grid>

          <Grid container item>
            <Grid container item spacing={2}>
              {showTags.map((tag, index) => (
                <Grid item key={index}>
                  <Button
                    id={index}
                    variant="contained"
                    sx={{
                      paddingY: "5px",
                      bgcolor: `${Theme.palette.button.default}`,
                      "&:hover": {
                        bgcolor: `${Theme.palette.button.hover}`,
                      },
                      "&:focus": {
                        bgcolor: `${Theme.palette.button.clicked}`,
                      },
                      "&:active": {
                        bgcolor: `${Theme.palette.button.clicked}`,
                      },
                    }}
                    onSelect={() => {
                      console.log(index);
                    }}
                  >
                    <Stack
                      direction="row"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography
                        fontSize="12px"
                        pr="10px"
                        sx={{
                          textTransform: "none",
                          alignSelf: "center",
                        }}
                      >
                        {tag.name}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: `${Theme.palette.count.primary}`,
                          width: "22px",
                          height: "22px",
                          borderRadius: "4px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography fontSize="12px">{tag.count}</Typography>
                      </Box>
                    </Stack>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid container item gap={4} marginTop={2} paddingBottom={8}>
            {routes.map((route, index) => {
              return (
                <Truck
                  details={route}
                  index={index}
                  handleClick={handleClick}
                  clickedIndex={clickedIndex}
                  key={index}
                />
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default TrackingLeftSide;
