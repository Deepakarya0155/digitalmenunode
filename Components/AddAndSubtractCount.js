import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Grid, IconButton } from "@mui/material";
import AppSilder from "./AppSlider";
import { AddIconButton } from "./AddIconButton";
import { RemoveIconButton } from "./RemoveIconButton";
import { useCart } from "@/Services/useCart";

export const AddAndSubtractCount = ({
  children,
  count,
  updateCount,
  number,
  msg,
}) => {
  const subtract = () => {
    updateCount((old) => {
      old -= number;

      if (old <= 0) {
        return 0;
      }
      return old;
    });
  };
  const add = () => {
    updateCount((old) => {
      return old + number;
    });
  };

  return (
    <Grid container>
      <Grid item>
        <RemoveIconButton onClickFunction={subtract}></RemoveIconButton>
      </Grid>
      <Grid
        item
        sx={{
          flex: 1,
        }}
      >
        {children}
      </Grid>
      <Grid item>
        <AddIconButton onClickFunction={add}></AddIconButton>
      </Grid>
    </Grid>
  );
};
