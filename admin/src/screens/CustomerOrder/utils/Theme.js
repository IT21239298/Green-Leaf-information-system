import { createTheme } from "@mui/material";
import { Colors } from "../constants/Colors";

const Theme = createTheme({
  palette: {
    background: {
      primary: Colors["backgroundPrimary"],
      secondary: Colors["backgroundSecondary"],
    },
    text: {
      primary: Colors["textPrimary"],
      secondary: Colors["textSecondary"],
    },
    button: {
      default: Colors["buttonDefault"],
      clicked: Colors["buttonClicked"],
      hover: Colors["buttonHover"],
    },
    count: {
      primary: Colors["countColor"],
    },
    truckButton: {
      default: Colors["truckButtonDefault"],
      hover: Colors["truckButtonHover"],
      clicked: Colors["truckButtonClicked"],
      clickedBorder: Colors["truckButtonClickedBorder"],
    },
  },
});

export { Theme };
