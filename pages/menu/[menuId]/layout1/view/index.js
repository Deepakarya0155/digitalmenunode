import { Box, Container } from "@mui/system";
import React from "react";
import { LayoutOneAppBar } from "../../../../../Components/Layout1AppBar";
import layoutcss from "@/styles/Layout1.module.css";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { AddBox, SystemUpdateOutlined } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Constants from "@/Services/Constants";
import { GET } from "@/Services/ApiCalling";
import { jsx } from "@emotion/react";
import {
  getRestaurentDetails,
  useGetRestaurentDetails,
} from "@/Services/BackendCall";
import { searchMenuItem } from "@/Services/HelperService";
import VegNonVegSelector from "@/Components/VegNonVegSelector";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Amount = ({ half, full }) => {
  return (
    <Grid container sx={{ marginTop: 1 }} textAlign="center">
      <Grid item xs={6}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#feb913",
            fontFamily: "'Oswald', sans-serif",
            border: 1,
            paddingLeft: "5px",
            paddingRight: "5px",
            borderRadius: "5px",
            textTransform: "uppercase",
            display: half !== undefined ? "block" : "none",
          }}
        >
          Half {half}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#feb913",
            fontFamily: "'Oswald', sans-serif",
            border: 1,
            paddingLeft: "5px",
            paddingRight: "5px",
            borderRadius: "5px",
            textTransform: "uppercase",
          }}
        >
          Full {full}
        </Typography>
      </Grid>
    </Grid>
  );
};

const CategoryText = ({ children }) => {
  return (
    <Typography
      variant="h5"
      sx={{ color: "#feb913", fontFamily: '"Tilt Prism", cursive' }}
    >
      {children}
    </Typography>
  );
};

const ItemAndDiscription = ({ title, discription, veg }) => {
  return (
    <Grid container>
      <Grid item xs={1}>
        <CircleIcon
          sx={{
            color: veg ? "Green" : "red",
            position: "relative",
            top: "5px",
            paddingRight: "3px",
            fontSize: "15px",
          }}
        ></CircleIcon>
      </Grid>
      <Grid item xs={11}>
        <Typography
          variant="h6"
          sx={{
            color: "#ffffff",
            fontFamily: "'Oswald', sans-serif",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{
            color: "#ffffff",
            fontFamily: "'Oswald', sans-serif",
            textTransform: "capitalize",
          }}
        >
          ({discription})
        </Typography>
      </Grid>
    </Grid>
  );
};

const MenuItem = ({ title, discription, half, full, veg }) => {
  return (
    <Container
      sx={{
        borderBottom: 2,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius: "10px",
      }}
    >
      <Grid container>
        <Grid item xs={9}>
          <ItemAndDiscription
            title={title}
            discription={discription}
            veg={veg}
          ></ItemAndDiscription>
        </Grid>
        <Grid item xs={3}>
          <Amount half={half} full={full}></Amount>
        </Grid>
      </Grid>
    </Container>
  );
};

const CategoryList = ({ catName, items }) => {
  return (
    <>
      <CategoryText>{catName}</CategoryText>
      {items.map((item, key) => (
        <MenuItem
          key={key}
          title={item.title}
          discription={item.discription}
          full={item.full}
          half={item.half}
          veg={item.veg}
        ></MenuItem>
      ))}
    </>
  );
};

const LayoutOneView = () => {
  const [searchText, setSearchText] = React.useState("");
  const [menuItems, setMenuItem] = React.useState();
  // const [response, setResponse] = React.useState();
  const [vegNonVegFlag, setVegNonVegFlag] = React.useState();
  const useGetRestaurent = useGetRestaurentDetails();
  const { appDetails: response } = useSelector((sl) => sl.app);
  const router = useRouter();

  React.useEffect(() => {
    useGetRestaurent.fetchApiDetails(router.query.menuId);
  }, [router.query.menuId]);

  React.useEffect(() => {
    if (response !== null && undefined !== response.menuItems) {
      console.log(response);
      setMenuItem(response.menuItems);
    }
  }, [response]);

  React.useEffect(() => {
    if (response !== null && undefined !== response.menuItems) {
      setMenuItem(searchMenuItem(searchText, vegNonVegFlag, response));
    }
  }, [searchText, vegNonVegFlag]);

  return (
    <>
      {response !== null && (
        <LayoutOneAppBar
          name={response.restaurentName}
          homeLink={response.homeLink}
          setSearchText={setSearchText}
        ></LayoutOneAppBar>
      )}

      {menuItems !== undefined && (
        <Container>
          <VegNonVegSelector response={setVegNonVegFlag}></VegNonVegSelector>
          {menuItems.map((item, key) => (
            <CategoryList
              key={key}
              catName={item.catName}
              items={item.items}
            ></CategoryList>
          ))}
        </Container>
      )}
    </>
  );
};
export default LayoutOneView;
