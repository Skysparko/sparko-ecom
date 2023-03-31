import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, productType } from "../redux/product.slice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
// import SimpleImageSlider from "react-simple-image-slider/dist/ImageSlider";
// import SimpleImageSlider from "react-simple-image-slider";
import bg1 from "../assets/images/temp/bg1.jpg";
import bg2 from "../assets/images/temp/bg2.jpg";
import bg3 from "../assets/images/temp/bg3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/parallax";
import { categoryType, getAllCategories } from "../redux/category.slice";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  EffectFlip,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  Autoplay,
} from "swiper";

export default function Home() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  //getting user from redux store
  const user = useSelector(
    (state: {
      user: {
        email: string;
        isAuthenticated: boolean;
        name: string;
        gender: string;
        role: string;
        id: string;
        pfp: string;
        address: string;
      };
    }) => state.user
  );
  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};

  // getting addresses from redux store
  const categoriesState = useSelector(
    (state: { product: { value: Array<categoryType>; loading: boolean } }) =>
      state.product
  );
  const { value: categories } = categoriesState ?? {};

  const images = [
    {
      url: bg1,
    },
    {
      url: bg2,
    },
    {
      url: bg3,
    },
    // {
    //   url: bg4,
    // },
    // {
    //   url: bg5,
    // },
  ];
  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );

  useEffect(() => {
    // dispatching all the addresses from server to the redux store
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    setWidth(window.innerWidth > 0 ? window.innerWidth : screen.width);
    // return clearInterval(interval);
  }, []);

  return (
    <div className="h-[2000px] bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        // spaceBetween={50}
        // slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img src={bg1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bg2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bg3} alt="" />
        </SwiperSlide>
        {/* <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {products.map(
          (item, i) =>
            item.category !== categories[0]._id && (
              <SwiperSlide
                key={i}
                className="m-5 gap-5 rounded border border-black p-5 text-center shadow-lg"
              >
                <img
                  src={item.images[0]}
                  alt=""
                  className="h-32 w-32 object-contain"
                />
                <span>
                  <h1 className="font-medium line-clamp-1">{item.title}</h1>
                  <p className="text-xs text-gray-700 line-clamp-2">
                    {item.description}
                  </p>
                </span>
                <span>Price:${`${item.price}`}</span>
                <span className="flex gap-2">
                  <button className="rounded border border-black px-5 py-2">
                    Buy Now
                  </button>
                  <button className="rounded border border-black px-5 py-2">
                    Add to Cart
                  </button>
                </span>
              </SwiperSlide>
            )
        )}
      </Swiper>
      {/* <section className="flex gap-5 border border-black p-5 ">
        {products.map((item, i) => (
          <div key={i} className="border border-black">
            <img
              src={item.images[0]}
              alt=""
              className="h-32 w-32 object-contain"
            />
            <span>
              <h1 className="font-medium line-clamp-1">{item.title}</h1>
              <p className="text-xs text-gray-700 line-clamp-2">
                {item.description}
              </p>
            </span>
            <span>Price:${`${item.price}`}</span>
            <span className="flex gap-2">
              <button className="border border-black">Buy Now</button>
              <button className="border border-black">Add to Cart</button>
            </span>
          </div>
        ))}
      </section> */}
    </div>
  );
}
