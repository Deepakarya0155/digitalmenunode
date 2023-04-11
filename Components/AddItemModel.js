import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Hidden, IconButton } from "@mui/material";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import { Box } from "@mui/system";
import AppSilder from "./AppSlider";
import { useDispatch, useSelector } from "react-redux";
import { updateAppCommonData } from "@/Services/CommonStore";
import { AddAndSubtractCount } from "./AddAndSubtractCount";
import { useCart } from "@/Services/useCart";

export default function AddItemModel({ open, setOpen, data }) {
  const [count, updateCount] = React.useState(0);
  const [price, updatePrice] = React.useState(0);
  const { calculatePrice, addToCart } = useCart();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    addToCart(data, count);
    updateCount(0);
    updatePrice(0);
  };

  React.useEffect(() => {
    updatePrice(calculatePrice(count, data.full, data.half));
  }, [count]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="secondary">
            ({data.discription})
          </DialogContentText>
          <Box>
            <Box>
              <AddAndSubtractCount
                updateCount={updateCount}
                number={data.half === null ? 1 : 0.5}
              >
                <Box sx={{ pl: 1 }}>
                  <AppSilder
                    count={count}
                    setCount={updateCount}
                    step={data.half === null ? 1 : 0.5}
                  ></AppSilder>
                </Box>
              </AddAndSubtractCount>
            </Box>

            <Box>
              <Grid container>
                <Grid item sx={{ border: 1, padding: 1 }}>
                  Q
                </Grid>
                <Grid item sx={{ flex: 1, border: 1, padding: 1 }}>
                  {count}
                </Grid>
                <Grid item sx={{ flex: 1, border: 1, padding: 1 }}>
                  Amount
                </Grid>
                <Grid item sx={{ flex: 1, border: 1, padding: 1 }}>
                  {price}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleClose} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
