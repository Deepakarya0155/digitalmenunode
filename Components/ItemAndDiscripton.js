import { Grid, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
export const ItemAndDiscription = ({ title, discription, veg }) => {
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
