import { Box, Container } from "@mui/system";
import React from "react";
import { LayoutOneAppBar } from "../../../../../Components/Layout1AppBar";
import layoutcss from "@/styles/Layout1.module.css";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
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
import AddItemModel from "@/Components/AddItemModel";
import ButtomNavigation from "@/Components/BottomNavigation";
import CartView from "@/Components/CardView";
import { ItemAndDiscription } from "@/Components/ItemAndDiscripton";

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
            display: half !== undefined && half !== null ? "block" : "none",
          }}
        >
          H-{half}
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
          F-{full}
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

const MenuItem = ({ id, title, discription, half, full, veg }) => {
  const [openModel, setOpenModel] = React.useState(false);
  return (
    <Container
      sx={{
        borderBottom: 2,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius: "10px",
      }}
    >
      <AddItemModel
        open={openModel}
        setOpen={setOpenModel}
        data={{ id, title, discription, half, full, veg }}
      ></AddItemModel>
      <Grid
        container
        onClick={() => {
          setOpenModel(true);
        }}
      >
        <Grid item xs={8}>
          <ItemAndDiscription
            title={title}
            discription={discription}
            veg={veg}
          ></ItemAndDiscription>
        </Grid>
        <Grid item xs={4}>
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
      <List>
        {items.map((item, key) => (
          <MenuItem
            key={key}
            id={item.item_id}
            title={item.title}
            discription={item.discription}
            full={item.full}
            half={item.half}
            veg={item.veg}
          ></MenuItem>
        ))}
      </List>
    </>
  );
};

const MenuView = ({ menuItems, setVegNonVegFlag }) => {
  return (
    <>
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

const LayoutOneView = () => {
  const [searchText, setSearchText] = React.useState("");
  const [menuItems, setMenuItem] = React.useState();
  const [vegNonVegFlag, setVegNonVegFlag] = React.useState();
  const useGetRestaurent = useGetRestaurentDetails();
  const { appDetails: response } = useSelector((sl) => sl.app);
  const [bottomNavigationValue, setBottomNavigationValue] =
    React.useState("menu");

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
      <Box sx={{ pt: 8 }}>
        {response !== null && (
          <LayoutOneAppBar
            name={response.restaurentName}
            homeLink={response.homeLink}
            setSearchText={setSearchText}
          ></LayoutOneAppBar>
        )}
        {bottomNavigationValue != undefined &&
          bottomNavigationValue === "menu" && (
            <MenuView
              menuItems={menuItems}
              setVegNonVegFlag={setVegNonVegFlag}
            ></MenuView>
          )}

        {bottomNavigationValue != undefined &&
          bottomNavigationValue === "cart" && <CartView></CartView>}
      </Box>
      <ButtomNavigation
        value={bottomNavigationValue}
        setValue={setBottomNavigationValue}
      ></ButtomNavigation>
    </>
  );
};
export default LayoutOneView;
