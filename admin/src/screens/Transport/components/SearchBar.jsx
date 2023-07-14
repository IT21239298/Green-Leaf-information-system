import * as React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ setSearchQuery }) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: "80%", height: "100%" }}
    >
      <FormControl sx={{ width: "100%", height: "100%" }}>
        <OutlinedInput
          placeholder="Search..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton sx={{ color: "white" }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          sx={{
            height: "85%",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              borderRadius: "15px",
            },
          }}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
      </FormControl>
    </Box>
  );
}
