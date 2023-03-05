import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import appbarcss from "@/styles/Layout1AppBar.module.css";
import { Hidden, Icon, Input, InputAdornment, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";

const SearchField = ({ searchTextFlag, setSearchTextFlag, setSearchText }) => {
  return (
    <Box>
      <Input
        variant="filled"
        className={appbarcss.searchInput}
        sx={{
          display: searchTextFlag ? "none" : "block",
        }}
        onBlur={(event) => {
          if (event.target.value === "") {
            setSearchTextFlag(true);
          }
        }}
        onKeyUp={(event) => {
          setSearchText(event.target.value);
        }}
        placeholder="Search"
      ></Input>
    </Box>
  );
};

const HomeIconButton = ({ homeLink }) => {
  const route = useRouter();
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 2, display: "block" }}
      onClick={() => {
        route.push(homeLink);
      }}
    >
      <HomeIcon />
    </IconButton>
  );
};

const RestName = ({ nm }) => {
  const [display, setDisplay] = React.useState(false);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    const arr = nm.split("");
    let i = 0;
    let size = arr.length;
    const interval = setInterval(() => {
      if (i == size) {
        clearInterval(interval);
      }
      setName((old) => nm.substring(0, i));
      i++;
    }, 100);
  }, []);

  return (
    <Typography
      variant="h6"
      className={appbarcss.restNameTitle}
      sx={{
        flexGrow: 1,
      }}
    >
      {name}
    </Typography>
  );
};

export function LayoutOneAppBar({ name, homeLink, setSearchText }) {
  const [searchTextFlag, setSearchTextFlag] = React.useState(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <HomeIconButton homeLink={homeLink}></HomeIconButton>
          <RestName nm={name}></RestName>
          <SearchField
            searchTextFlag={searchTextFlag}
            setSearchTextFlag={setSearchTextFlag}
            setSearchText={setSearchText}
          ></SearchField>
          <IconButton
            sx={{ display: searchTextFlag ? "block" : "none" }}
            onClick={() => {
              console.log(searchTextFlag);
              setSearchTextFlag((flag) => !flag);
            }}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
