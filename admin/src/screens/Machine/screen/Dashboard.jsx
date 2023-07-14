import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Dashboard = () => {
  const [getMaintenance, setMaintenance] = useState([]); //hook

  useEffect(() => {
    axios
      .get("http://localhost:8082/maintenance")
      .then((response) => {
        console.log(response.data);
        setMaintenance(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  getMaintenance.map((item) => console.log(item.statues));

  const activeCount = getMaintenance.reduce((count, item) => {
    if (item.statues === "active") {
      return count + 1;
    }
    return count;
  }, 0);

  const maintenanceCount = getMaintenance.reduce((count, item) => {
    if (item.statues === "maintenance") {
      return count + 1;
    }
    return count;
  }, 0);

  console.log(`Number of active items: ${activeCount}`);
  console.log(`Number of items under maintenance: ${maintenanceCount}`);

  return (
    <Grid container>
      <Grid container item>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "600px",
            height: "100px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              color: "white",
              fontFamily: "Arvo",
              fontWeight: "bold",
              mt: "18px",
            }}
          >
            Machine Management
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "250px",
            height: "250px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "50px",
            mt: "50px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "white",
              fontFamily: "Arvo",
              fontWeight: "bold",
              mt: "18px",
            }}
          >
            No of Machines
            <iframe
              style={{
                background: "#105949",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              width="100%"
              height="200"
              src="https://charts.mongodb.com/charts-project-0-oejeh/embed/charts?id=645d3d6a-e40f-4125-8351-6ce91c2c7fda&maxDataAge=60&theme=dark&autoRefresh=true"
            ></iframe>
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "250px",
            height: "250px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "50px",
            mt: "50px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "white",
              fontFamily: "Arvo",
              fontWeight: "bold",
              mt: "18px",
            }}
          >
            Active
          </Typography>
          <Typography
            sx={{
              fontSize: "140px",
              color: "white",
              fontFamily: "Arvo",
              fontWeight: "bold",
              mt: "12px",
            }}
          >
            {activeCount}
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "250px",
            height: "250px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "50px",
            mt: "50px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "white",
              fontFamily: "Arvo",
              fontWeight: "bold",
              mt: "18px",
            }}
          >
            Under Maintenance
          </Typography>
          <Typography
            sx={{
              fontSize: "140px",
              color: "white",
              fontFamily: "Arvo",
              fontWeight: "bold",
              mt: "12px",
            }}
          >
            {maintenanceCount}
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "650px",
            height: "650px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "50px",
            mt: "50px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "white",
              fontFamily: "Arvo",
              fontWeight: "bold",
              mt: "18px",
            }}
          >
            Active/Maintenances
            <iframe
              sx={{
                background: "#21313C",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              width="640"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-oejeh/embed/charts?id=645d5ee0-6cd4-488b-8242-d817f42b3dd0&maxDataAge=60&theme=dark&autoRefresh=true"
            ></iframe>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
