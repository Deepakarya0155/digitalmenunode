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
const AddAndSubtractCount = ({ count, updateCount, number, msg }) => {
  const iconSX = { fontSize: 30, pt: 2.5 };

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
        <IconButton onClick={subtract} color="primary">
          <RemoveCircleOutlinedIcon sx={iconSX}></RemoveCircleOutlinedIcon>
        </IconButton>
      </Grid>
      <Grid item sx={{ flex: 1, pt: 2.7, pl: 1 }}>
        <AppSilder
          count={count}
          setCount={updateCount}
          step={number}
        ></AppSilder>
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={add}>
          <AddCircleOutlinedIcon sx={iconSX}></AddCircleOutlinedIcon>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default function AddItemModel({ open, setOpen, data }) {
  const [count, updateCount] = React.useState(0);
  const [price, updatePrice] = React.useState(0);
  const { cart } = useSelector((sl) => sl.app);
  const dispatcher = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    let tempCart = [];

    setOpen(false);
    if (count > 0) {
      tempCart = [...cart, { ...data, count, price }];
    }
    updateCount(0);
    updatePrice(0);
    dispatcher(updateAppCommonData.updateCart(tempCart));
  };

  React.useEffect(() => {
    let full = parseInt(count);
    let half = count > full ? 1 : 0;
    let price = data.full * full + data.half * half;
    updatePrice(price);
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
                msg={"Half"}
              ></AddAndSubtractCount>
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
