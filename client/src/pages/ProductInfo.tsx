import React, { useState } from "react";
import { useSelector } from "react-redux";
import { productType } from "../redux/product.slice";
import { useEffect } from "react";

export default function ProductInfo() {
  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};
  const [product, setProduct] = useState<productType>();
  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("p")!;
    console.log(productId);

    const productData = products.find((item) => productId === item._id);
    setProduct(productData);
  });

  return (
    <div>
      <h1>{product?.title}</h1>
    </div>
  );
}
