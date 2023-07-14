import * as React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: "100%", height: "10%", mt: 2, mb: 3 }}
    >
      <FormControl sx={{ width: "100%", height: "100%" }}>
        <OutlinedInput
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          endAdornment={
            <InputAdornment position="end">
              <IconButton sx={{ color: "white" }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          sx={{
            color: "#fff",
            height: "85%",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              borderRadius: "15px",
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
