import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Theme } from "../../utils/Theme";

export default function VehicleSelect({ label, handleChange, value, items }) {
  const [vehicleNames, setVehicleNames] = useState([]);
  // const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const uniqueNames = new Set();

    items.forEach((item) => {
      uniqueNames.add(item.vehicleId);
    });

    setVehicleNames(Array.from(uniqueNames));
  }, [items]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
          label={label}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              borderWidth: "thin",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              borderWidth: "thin",
            },
          }}
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  backgroundColor: Theme.palette.background.primary,
                },
              },
            },
          }}
        >
          {vehicleNames.map((name) => {
            return (
              <MenuItem
                key={name}
                value={name}
                sx={{
                  bgcolor: Theme.palette.background.primary,
                  "&:hover": {
                    bgcolor: Theme.palette.background.secondary,
                  },
                }}
              >
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
