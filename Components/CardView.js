import { useCart } from "@/Services/useCart";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddAndSubtractCount } from "./AddAndSubtractCount";
import { AddIconButton } from "./AddIconButton";
import AddItemModel from "./AddItemModel";
import { ItemAndDiscription } from "./ItemAndDiscripton";
import { RemoveIconButton } from "./RemoveIconButton";

const MenuItem = ({ menuItemData }) => {
  const [currentCount, updateCurrentCount] = useState(menuItemData.count);
  const { updateCart, getTotalPrice } = useCart();
  const { cart } = useSelector((sl) => sl.app);
  useEffect(() => {
    updateCart(menuItemData, currentCount);
  }, [currentCount]);

  return (
    <Box
      sx={{
        borderBottom: 2,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius: "10px",
      }}
    >
      <Grid container>
        <Grid item xs={7} sm={9}>
          <ItemAndDiscription
            title={menuItemData.title}
            discription={menuItemData.discription}
            veg={menuItemData.veg}
          ></ItemAndDiscription>
        </Grid>
        <Grid item xs={5} sm={3}>
          <AddAndSubtractCount
            updateCount={updateCurrentCount}
            number={
              menuItemData.half === null || menuItemData.half === undefined
                ? 1
                : 0.5
            }
          >
            <Typography
              color="primary"
              variant="h6"
              sx={{ pt: 1, textAlign: "center" }}
            >
              {currentCount}
            </Typography>
          </AddAndSubtractCount>
        </Grid>
      </Grid>
    </Box>
  );
};

const CartView = () => {
  const cart = useSelector((sl) => sl.app.cart);
  const { updateCart, getTotalPrice } = useCart();
  useEffect(() => {
    console.log("Sorted");
    console.log(Array.of(cart).sort((a, b) => (a.id < b.id ? a : b)));

    console.log(getTotalPrice());
  }, [cart]);
  return (
    <Container>
      {cart.map((i, k) => (
        <MenuItem key={i.id} menuItemData={i} />
      ))}
    </Container>
  );
};
export default CartView;
