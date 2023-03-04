import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";

const themeOptions = {
  palette: {
    // mode: "light",
    primary: {
      main: "#feb913",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#575455",
    },
  },
};

const theme1 = createTheme(themeOptions);

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme1}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
