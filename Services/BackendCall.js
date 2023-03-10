import { GET } from "./ApiCalling";
import axios from "axios";
import { updateAppCommonData } from "./CommonStore";
import { useDispatch, useSelector } from "react-redux";
const { default: Constants } = require("./Constants");

export const getRestaurentDetails = (restId) => {
  return new Promise((res, rej) => {
    axios
      .get(Constants.BACKEND_URL_RESTAURENT_DETAILS + restId)
      .then((r) => res(r.data))
      .catch((e) => rej(e));
  });
};

export const useGetRestaurentDetails = () => {
  const dispatch = useDispatch();
  const { appDetails } = useSelector((sl) => sl.app);

  const apiCall = (restId) => {
    axios
      .get(Constants.BACKEND_URL_RESTAURENT_DETAILS + restId)
      .then((r) => {
        dispatch(updateAppCommonData.updateAppDetails(r.data));
      })
      .catch((e) => console.log(e));
  };

  const fetchApiDetails = (restId) => {
    console.log(restId);
    if (restId !== undefined) {
      if (appDetails === null) {
        apiCall(restId);
      }
      if (
        appDetails != null &&
        appDetails.appId !== null &&
        appDetails.appId !== parseInt(restId)
      ) {
        apiCall(restId);
      }
    }
  };

  return { fetchApiDetails };
};
