const { Hidden } = require("@mui/material");

export const Mobile = ({ children }) => {
  return <Hidden smUp>{children}</Hidden>;
};
export const Desktop = ({ children }) => {
  return <Hidden smDown>{children}</Hidden>;
};
