import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function ButtomNavigation({ value, setValue }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Recents"
        value="menu"
        icon={<MenuIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="cart"
        icon={<ReceiptIcon />}
      />
    </BottomNavigation>
  );
}
