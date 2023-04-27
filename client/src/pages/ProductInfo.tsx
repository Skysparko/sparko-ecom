import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { productType } from "../redux/product.slice";
import { useEffect } from "react";
import { addItemToCart } from "../utils/cart.functions";
import {
  MagnifierContainer,
  SideBySideMagnifier,
} from "react-image-magnifiers";
import { useNavigate } from "react-router-dom";

export default function ProductInfo() {
  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};
  const [product, setProduct] = useState<productType>();
  const [mainImage, setMainImage] = useState(product?.images[0]);

  //this function change style of the selected div
  const highlightSelected = (i: number) => {
    const image = document.querySelectorAll("#images img");

    // remove the class from the others
    image.forEach((d) => {
      d.classList.remove("border-black");
      d.classList.remove("border-2");
      d.classList.add("border");
    });

    //adding styling classes to the selected div
    const page = image[i];
    page?.classList.remove("border");
    page?.classList.add("border-2", "border-black");
  };

  const navigate = useNavigate();

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("p")!;
    console.log(productId);

    const productData = products.find((item) => productId === item._id);
    setProduct(productData);
    setMainImage(productData?.images[0]);
  });

  return (
    <article>
      <div className="grid grid-cols-[1.5fr,2fr,1fr]">
        <section className="flex flex-col items-center justify-center gap-10">
          <span className="">
            <img
              src={mainImage}
              alt={product?.title}
              className="h-96 w-96 cursor-pointer object-contain shadow"
            />
            {/* <SideBySideMagnifier
              imageSrc={mainImage!}
              imageAlt={product?.title}
            /> */}
          </span>
          <span className=" flex flex-row gap-5" id="images">
            {product?.images.map((item, i) => (
              <img
                src={item}
                key={i}
                alt={product.title}
                className={
                  i === 0
                    ? "h-20 w-20 cursor-pointer border-2 border-black object-contain"
                    : "h-20 w-20 cursor-pointer  border object-contain"
                }
                onMouseOver={() => {
                  setMainImage(item);
                  highlightSelected(i);
                }}
              />
            ))}
          </span>
        </section>
        <section className="flex flex-col  items-center  justify-evenly gap-2 p-5 text-center ">
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <span className=" flex gap-1 text-xl">
            <h4>₹</h4>
            {product?.offer! > 0 ? (
              <span className="flex gap-1">
                <h4 className="text-red-700 line-through">{`${product?.price}`}</h4>
                <h4 className="">{`${Math.round(
                  product?.price! / product?.offer!
                )}`}</h4>
              </span>
            ) : (
              <h4 className="">{`${product?.price}`}</h4>
            )}
          </span>
          <p>{product?.description}</p>

          <span className=" flex w-96 flex-col  gap-2 ">
            <button className=" rounded border border-gray-400 px-5 py-2 shadow">
              Buy Now
            </button>
            <button
              className="rounded border border-gray-400 bg-sky-700 px-5 py-2 text-white shadow"
              onClick={() => addItemToCart(`${product?._id}`)}
            >
              Add to Cart
            </button>
          </span>
        </section>
        <section className="flex h-screen flex-col gap-5 overflow-auto p-5">
          <h1 className="text-center text-3xl font-semibold">
            Similar Products
          </h1>

          {products.map(
            (item, i) =>
              item.category === product?.category && (
                <div
                  className="flex  cursor-pointer flex-col gap-5 border p-3 text-center shadow transition-transform hover:scale-105"
                  onClick={() => navigate(`/product?p=${item?._id}`)}
                >
                  <img
                    src={item.images[0]}
                    alt=""
                    className="m-auto h-32 w-32  object-contain"
                  />
                  <span className="flex flex-col gap-2">
                    <h1 className="font-medium line-clamp-1">{item.title}</h1>
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {item.description}
                    </p>
                  </span>
                  <span className="flex justify-center gap-1">
                    <h4>Price: ₹</h4>

                    {item.offer > 0 ? (
                      <>
                        <h4 className="text-red-700 line-through">{`${item.price}`}</h4>
                        <h4 className="">{`${Math.round(
                          item.price / item.offer
                        )}`}</h4>
                      </>
                    ) : (
                      <h4 className="">{`${item.price}`}</h4>
                    )}
                  </span>
                </div>
              )
          )}
        </section>
      </div>
    </article>
  );
}
