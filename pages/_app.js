import { appStore } from "@/Services/CommonStore";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#feb913",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#575455",
      paper: "#575455",
    },
    text: {
      primary: "#feb913",
    },
    divider: "#feb913",
  },
};

const theme1 = createTheme(themeOptions);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={appStore}>
      <ThemeProvider theme={theme1}>
        <Component {...pageProps} />
        <style>{`
          body {
            background-color: ${theme1.palette.background.default};      
          }
        `}</style>
      </ThemeProvider>
    </Provider>
  );
}
