import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Hidden, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
const AddAndSubtractCount = ({ updateCount, number, msg }) => {
  const subtract = () => {
    updateCount((old) => {
      if (old == 0) {
        return old;
      } else {
        return old - number;
      }
    });
  };
  const add = () => {
    updateCount((old) => {
      return old + number;
    });
  };

  return (
    <Grid container>
      <Grid item sx={{ flex: 1 }}>
        {msg}
      </Grid>
      <Grid item>
        <Button variant="outlined" sx={{ borderRadius: 15 }} onClick={subtract}>
          <RemoveIcon sx={{ fontSize: 20 }}></RemoveIcon>
        </Button>
        <Button variant="outlined" sx={{ borderRadius: 15 }} onClick={add}>
          <AddIcon sx={{ fontSize: 20 }}></AddIcon>
        </Button>
      </Grid>
    </Grid>
  );
};

export default function AddItemModel({ open, setOpen, data }) {
  const [count, updateCount] = React.useState(0);
  const [price, updatePrice] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(data);
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
            <Box sx={{ display: data.half === null ? "none" : "block" }}>
              <AddAndSubtractCount
                updateCount={updateCount}
                number={0.5}
                msg={"Half"}
              ></AddAndSubtractCount>
            </Box>
            <AddAndSubtractCount
              updateCount={updateCount}
              number={1}
              msg={"Full"}
            ></AddAndSubtractCount>
            {price}
          </DialogContentText>
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
