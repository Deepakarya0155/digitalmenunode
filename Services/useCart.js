import { useDispatch, useSelector } from "react-redux";
import { updateAppCommonData } from "./CommonStore";

export const useCart = () => {
  const { cart } = useSelector((sl) => sl.app);
  const dispatcher = useDispatch();

  const calculatePrice = (c, fullPrice, HalfPrice) => {
    let full = parseInt(c);
    let half = c > full ? 1 : 0;
    let price = fullPrice * full + HalfPrice * half;
    return price;
  };

  const addToCart = (data, count) => {
    let tempCart = [];
    if (count > 0) {
      let tempData = cart.filter((i) => i.id === data.id)[0];
      if (tempData !== undefined) {
        tempData = {
          ...tempData,
          count: tempData.count + count,
          price: calculatePrice(tempData.count, data.full, data.half),
        };
        tempCart = [...cart.filter((i) => i.id !== data.id), { ...tempData }];
      } else {
        tempCart = [
          ...cart,
          {
            ...data,
            count,
            price: calculatePrice(count, data.full, data.half),
          },
        ];
      }
      dispatcher(updateAppCommonData.updateCart(tempCart));
    }
  };

  const updateCart = (data, count) => {
    let tempCart = [];
    if (count > 0) {
      let tempData = cart.filter((i) => i.id === data.id)[0];
      if (tempData !== undefined) {
        tempData = {
          ...tempData,
          count: count,
          price: calculatePrice(count, data.full, data.half),
        };
        tempCart = [...cart.filter((i) => i.id !== data.id), { ...tempData }];
      } else {
        tempCart = [
          ...cart,
          {
            ...data,
            count,
            price: calculatePrice(count, data.full, data.half),
          },
        ];
      }
      dispatcher(updateAppCommonData.updateCart(tempCart));
    } else {
      dispatcher(
        updateAppCommonData.updateCart(cart.filter((i) => i.id !== data.id))
      );
    }
  };

  const getTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    return total;
  };

  return {
    calculatePrice,
    addToCart,
    updateCart,
    getTotalPrice,
  };
};
