import React from "react";

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";

const PhoneNumberDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ color: "black" }}>Phone Number</DialogTitle>
      <Typography
        sx={{
          color: "black",
          display: "center",
          justifyContent: "center",
          mb: "20px",
        }}
      >
        076 666 5142
      </Typography>
    </Dialog>
  );
};

PhoneNumberDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PhoneNumberDialog;
