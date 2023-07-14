import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { default as api } from "../components/store/apiSlice";
import jsPDF from 'jspdf';

const Dashboard = () => {
  const { data: paymentData, isSuccess: isPaymentSuccess } = api.useGetpaymentQuery();
  const [totalSuppliers, setTotalSuppliers] = useState(0);

  useEffect(() => {
    if (isPaymentSuccess) {
      setTotalSuppliers(paymentData.length);
    }
  }, [isPaymentSuccess, paymentData]);

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    const tableData = paymentData.map(payment => ({
      'Supplier ID': payment.supID,
      'Tea Leaves Quantity': payment.quantity,
      'Tea Leaves Price(Monthly)': payment.mquantity,
      'Fertilizer Cost': payment.cost,
      'Transport Cost': payment.transecost,
      'Tea Packet Cost': payment.packetcost,
      'Monthly Payment': payment.mPay
    }));

    doc.autoTable({
      head: [['Supplier ID', 'Tea Leaves Quantity', 'Tea Leaves Price(Monthly)', 'Fertilizer Cost', 'Transport Cost', 'Tea Packet Cost', 'Monthly Payment']],
      body: tableData,
    });

    doc.save('payment_report.pdf');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: '#2F2F3D',
            width: '350px',
            height: '250px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            borderRadius: '25px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            ml: '100px',
          }}
        >
          <Typography fontSize={'30px'} mt={'10px'} fontFamily={'Arvo'}>
            Total Suppliers
          </Typography>
          <Typography fontSize={'50px'} mt={'20px'} fontFamily={'Arvo'}>
            {totalSuppliers}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: '#2F2F3D',
            width: '350px',
            height: '250px',
            margin: '50px',
            mt: '-5px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            borderRadius: '25px',
            textAlign: 'center',
          }}
        >
          <Typography fontSize={'30px'} mt={'10px'} fontFamily={'Arvo'} color={'white'}>
            Report
          </Typography>
          <Button
            color="green"
            variant="contained"
            sx={{ mt: 9, mb: 90, bgcolor: 'green', mt: '200px' }}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
        </Box>
      </Grid>


      <Grid item xs={6}>
        <Box
          sx={{
            bgcolor: '#2F2F3D',
            width: '1300px',
            height: '440px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            borderRadius: '25px',
            textAlign: 'center',
            ml: '50px',
            mt: '10px',
          }}
        >
          <Typography fontSize={'30px'} mt={'10px'} fontFamily={'Arvo'} color={'white'}>
   chart
  <iframe
    style={{
      background: '#21313C',
      border: 'none',
      borderRadius: '2px',
      boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      width: '100%',
      height: '430px',
    }}
    src="https://charts.mongodb.com/charts-project-0-oejeh/embed/charts?id=645dc8a0-e40f-4331-865b-6ce91c947a04&maxDataAge=60&theme=dark&autoRefresh=true"
  ></iframe>
</Typography>

          {/* <BarChart width={720} height={390} data={paymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="supplierName" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
            <Legend />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#14EDBD" />
          </BarChart> */}
        </Box>
      </Grid>

    
    </Grid>
  );
};

export default Dashboard;

