import React, { useEffect } from "react";
import { orderType } from "../../../redux/order.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchAllOrders } from "../../../utils/order.functions";

export default function Orders() {
  const ordersState = useSelector(
    (state: { order: { value: Array<orderType>; loading: boolean } }) =>
      state.order
  );
  const { value: orders, loading } = ordersState ?? {};
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {}, [dispatch, ordersState]);
  return (
    <div>
      {orders.map((product, i) => (
        <>
          <h1>{product._id}</h1>
        </>
      ))}
    </div>
  );
}
