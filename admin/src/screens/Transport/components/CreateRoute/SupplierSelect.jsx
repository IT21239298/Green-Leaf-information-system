import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { Theme } from "../../utils/Theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SupplierSelect({ label, handleChange, value, items }) {
  const theme = useTheme();
  const [supplierNames, setSupplierNames] = React.useState([]);

  React.useEffect(() => {
    const uniqueNames = new Set();

    items.forEach((item) => {
      uniqueNames.add(item);
    });

    setSupplierNames(Array.from(uniqueNames));
  }, [items]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
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
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
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
          {supplierNames.map((item) => (
            <MenuItem
              key={`${item.supID} ${item.addressLat}`}
              value={item.supID}
              sx={{
                bgcolor: Theme.palette.background.primary,
                "&:hover": {
                  bgcolor: Theme.palette.background.secondary,
                },
              }}
              style={getStyles(item.fname, value, theme)}
            >
              {`${item.supID} - ${item.fname} ${item.lname}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
