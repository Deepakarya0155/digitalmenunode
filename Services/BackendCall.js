const { GET } = require("./ApiCalling");
const { default: Constants } = require("./Constants");

export const getRestaurentDetails = (restId, setResponse, setError) => {
  GET(Constants.BACKEND_URL_RESTAURENT_DETAILS + "?restId=" + restId)
    .then((res) => {
      setResponse(res);
    })
    .catch((err) => {
      console.log(err);
      setError("Something Went wrong");
    });
};
