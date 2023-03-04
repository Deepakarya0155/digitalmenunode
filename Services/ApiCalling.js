import axios from "axios";

export const GET = (url) => {
  return new Promise((res, rej) => {
    axios
      .get(url)
      .then((r) => res(r.data))
      .catch((e) => rej(e));
  });
};
