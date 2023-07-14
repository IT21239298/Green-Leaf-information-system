import { Box, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import CustomerStats from "../components/CustomerStats";
import OrderStats from "../components/OrderStats";
import axios from "axios";
import { useEffect } from "react";
import type1 from "../assets/svgs/img/type1.png"
import type2 from "../assets/svgs/img/type2.png"
import type3 from "../assets/svgs/img/type3.png"
import type4 from "../assets/svgs/img/type4.png"
import type5 from "../assets/svgs/img/type5.png"

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8082/customer")
      .then((response) => {
        console.log(response.data);
        setCustomerCount(response.data.length);
        setOrderCount(response.data.length);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid>
      <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "900px",
            height: "80px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "250px",
            mb: "150px",
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              color: "#105949",
              fontFamily: "Arvo",
              fontWeight: "bold",
              textAlign: "center",
              ml: "10px",
            }}
          >
            Customer & Order Management
          </Typography>
        </Box>
        <Grid item xs={1} >
        <CustomerStats title="Total Registered Customers" value={customerCount}/>
      </Grid>
      <br></br>
      <Grid item xs={1}>
        <OrderStats title="Total Orders Received" value={orderCount} />
      </Grid>

      <Grid container spacing={1}>
      <Grid item xs={2}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "180px",
            height: "350px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
          }}
        >
          <Typography>Type1</Typography>
          <Grid item xs={6}>
          <img
            alt="type1"
            src={type1}
            style={{
              width: "150px",
              height: "150px",
              boxShadow: "0px 0px 5px #ccc",
              marginTop: "50px",
              marginLeft:"13px",
            }}
          />
        </Grid> <Typography>Green Tea</Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "180px",
            height: "350px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
          }}
        >
          <Typography>Type2</Typography>
          <Grid item xs={6}>
          <img
            alt="type2"
            src={type2}
            style={{
              width: "150px",
              height: "150px",
              boxShadow: "0px 0px 5px #ccc",
              marginTop: "50px",
              marginLeft:"13px",
            }}
          />
        </Grid> <Typography>Black Tea</Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "180px",
            height: "350px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
          }}
        >
          <Typography>Type3</Typography>
          <Grid item xs={6}>
          <img
            alt="type3"
            src={type3}
            style={{
              width: "150px",
              height: "150px",
              boxShadow: "0px 0px 5px #ccc",
              marginTop: "50px",
              marginLeft:"13px",
            }}
          />
        </Grid> <Typography>Herbal Tea</Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "180px",
            height: "350px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
          }}
        ><Typography>Type4</Typography>
            <Grid item xs={6}>
          <img
            alt="type4"
            src={type4}
            style={{
              width: "150px",
              height: "150px",
              boxShadow: "0px 0px 5px #ccc",
              marginTop: "50px",
              marginLeft:"13px",
            }}
          />
        </Grid> <Typography>Yellow Tea</Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "180px",
            height: "350px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
          }}
        ><Typography>Type5</Typography>
            <Grid item xs={6}>
          <img
            alt="type5"
            src={type5}
            style={{
              width: "150px",
              height: "150px",
              boxShadow: "0px 0px 5px #ccc",
              marginTop: "50px",
              marginLeft:"13px",
            }}
          />
        </Grid> <Typography>Ginger Tea</Typography>
        </Box>
      </Grid>
      </Grid>
 

      </Grid>
    
   
    
  




  );
};

export default Dashboard;
