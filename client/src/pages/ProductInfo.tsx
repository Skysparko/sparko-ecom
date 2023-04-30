import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, productType } from "../redux/product.slice";
import { useEffect } from "react";
import { addItemToCart } from "../utils/cart.functions";
import {
  MagnifierContainer,
  SideBySideMagnifier,
} from "react-image-magnifiers";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { instance } from "../utils/functions";
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
  console.log(i);
};
export default function ProductInfo() {
  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};
  // const [product, setProduct] = useState<productType>();

  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [tags, setTags] = useState<Array<string>>([]);
  const [images, setImages] = React.useState<Array<string>>([]);
  // const [userImages, setUserImages] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(-1);
  const [offer, setOffer] = React.useState(-1);
  const [stock, setStock] = React.useState(-1);
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  // const [productId, setProductId] = React.useState("");
  const [status, setStatus] = React.useState("Public");
  const [subCategoryList, setSubCategoryList] = useState<
    Array<{
      _id: string;
      name: string;
      description: string;
      categoryID: string;
    }>
  >([]);
  const [mainImage, setMainImage] = useState("");

  const [productChange, setProductChange] = useState(false);

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("p")!;
    if (productId) {
      setProductId(productId);

      instance
        .get(`product/${productId}`)
        .then((res) => {
          setProductId(res.data._id);
          setTags(res.data.tags);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setPrice(res.data.price);
          setOffer(res.data.offer);
          setStock(res.data.stock);
          setCategory(res.data.category);
          setSubCategory(res.data.subCategory);
          setStatus(res.data.status);
          let userImages = res.data.images;
          let i = 0;
          res.data.images.forEach((item: string) => {
            userImages[i] = item;
            i++;
          });
          setCategory(res.data.category);
          instance
            .get(`/product/sub-categories/${res.data.category}`)
            .then((res) => {
              setSubCategoryList(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          setSubCategory(res.data.subCategory);
          setMainImage(userImages[0]);
          setImages(userImages);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [productChange]);

  return (
    <article>
      <div className="grid grid-cols-[1.5fr,2fr,1fr]">
        <section className="flex flex-col items-center justify-center gap-10">
          <span className="">
            <img
              src={mainImage}
              alt={title}
              className="h-96 w-96 cursor-pointer object-contain shadow"
            />
            {/* <SideBySideMagnifier
              imageSrc={mainImage!}
              imageAlt={product?.title}
            /> */}
          </span>
          <span className=" flex flex-row gap-5" id="images">
            {images.map((item, i) => (
              <img
                src={item}
                key={i}
                alt={title}
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
          <h1 className="text-3xl font-semibold">{title}</h1>
          <span className=" flex gap-1 text-xl">
            <h4>₹</h4>
            {offer! > 0 ? (
              <span className="flex gap-1">
                <h4 className="text-red-700 line-through">{`${price}`}</h4>
                <h4 className="">{`${Math.round(price / offer)}`}</h4>
              </span>
            ) : (
              <h4 className="">{`${price}`}</h4>
            )}
          </span>
          <p>{description}</p>

          <span className=" flex w-96 flex-col  gap-2 ">
            <button className=" rounded border border-gray-400 px-5 py-2 shadow">
              Buy Now
            </button>
            <button
              className="rounded border border-gray-400 bg-sky-700 px-5 py-2 text-white shadow"
              onClick={() => addItemToCart(`${productId}`)}
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
              item.category === category && (
                <div
                  className="flex  cursor-pointer flex-col gap-5 border p-3 text-center shadow transition-transform hover:scale-105"
                  onClick={() => {
                    navigate(`/product?p=${item?._id}`);
                    setProductChange(!productChange);
                  }}
                  key={i}
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
