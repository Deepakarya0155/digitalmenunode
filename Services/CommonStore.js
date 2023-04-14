const { createSlice, configureStore } = require("@reduxjs/toolkit");
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const initData = {
  name: "deepak",
  appDetails: null,
  drawerMenuItem: [],
  cart: [],
};

const appSlice = createSlice({
  name: "appStore",
  initialState: initData,
  reducers: {
    updateName(state, action) {
      return { ...state, name: action.payload.restaurentName };
    },
    updateAppDetails(state, action) {
      return {
        ...state,
        appDetails: action.payload,
        drawerMenuItem: createDrawerMenuItem(action.payload),
      };
    },
    updateCart(state, action) {
      return {
        ...state,
        cart: action.payload,
      };
    },
  },
});

const createDrawerMenuItem = (appDetails) => {
  let menu = [];
  menu.push({
    icon: <RestaurantMenuIcon color="primary" />,
    title: "HOME",
    link: "/menu/" + appDetails.appId + "/layout1",
  });
  return menu;
};

export const updateAppCommonData = { ...appSlice.actions };

export const appStore = configureStore({
  reducer: { app: appSlice.reducer },
  middleware: customizedMiddleware,
});
