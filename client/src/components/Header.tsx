import React, { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight, MdSearch } from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import SideBar, { openSidebar } from "./SideBar";
import { useNavigate, Link } from "react-router-dom";

interface PropTypes {
  isAuthenticated: boolean;
  user: Object;
}

export default function Header({ isAuthenticated, user }: PropTypes) {
  const navigate = useNavigate();
  //logic for responsive design
  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth > 0 ? window.innerWidth : screen.width);
    });
    // Elements
    const header: HTMLElement | null = document.getElementById("header");

    //logic for responsive design
    if (width < 850) {
      header?.classList.add("grid-cols-[1fr,1fr]");
      header?.classList.remove("grid-cols-[1fr,2.5fr,1fr]");
      header?.classList.remove("border", "border-black");
    } else {
      header?.classList.remove("grid-cols-[1fr,1fr]");
      header?.classList.add("grid-cols-[1fr,2.5fr,1fr]");
      header?.classList.add("border", "border-black");
    }
  });

  return (
    <>
      {/* Side bar */}
      <aside>
        <SideBar />
      </aside>
      {/*  Three grid containing name search and function */}
      <article
        id="header"
        className="grid select-none grid-cols-[1fr,2.5fr,1fr] border border-black  bg-sky-900 py-2  text-2xl bg-blend-hue  max-lg:text-xl max-md:text-lg"
      >
        {/* hamburger column and the name of the company */}
        <div className=" flex  items-center  gap-5  pl-5 text-3xl text-white max-lg:text-2xl max-md:gap-2 max-md:pl-2 max-sm:text-[1.4rem]">
          <button className="cursor-pointer " onClick={openSidebar}>
            <VscThreeBars />
          </button>

          <h1 className="cursor-pointer" onClick={() => navigate("/")}>
            SStore
          </h1>
        </div>

        {
          /* Ui for search (devices having screens more then 850px)*/
          width > 850 && (
            <div id="search_desktop">
              <form
                id="search_desktop_form"
                method="get"
                className="flex justify-center rounded-md border  border-black text-base focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 "
              >
                {/* categories */}
                <select
                  name="categories"
                  id="categories_desktop"
                  className="cursor-pointer rounded-l-md border border-black bg-white text-center outline-none"
                >
                  <option value="All">All</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                </select>
                {/* search bar */}
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="w-full border border-black px-2  outline-none"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search"
                />
                {/* search button */}
                <button
                  type="submit"
                  id="submit_search_desktop"
                  className="rounded-r-md border border-black bg-blue-300 p-1 text-3xl max-lg:text-2xl"
                >
                  <MdSearch />
                </button>
              </form>
            </div>
          )
        }

        {/* section containing login and cart  */}
        <div className=" flex  justify-end gap-10  pr-10 text-xl text-white max-lg:pr-5 max-md:gap-5 max-sm:text-[1.15rem] max-xs:text-[1rem]">
          {/* Login section */}
          <span
            className="flex cursor-pointer items-center"
            onClick={() => navigate("/authentication")}
          >
            {width > 250 && (
              <span className="flex cursor-pointer items-center">
                {isAuthenticated ? <h3>Logout</h3> : <h3>Login</h3>}
                <MdOutlineKeyboardArrowRight />
              </span>
            )}

            <FaUserAlt />
          </span>
          {/* cart section */}
          <button className="text-2xl max-sm:text-[1.3rem] max-xs:text-[1.25rem]">
            <Link to="/cart">
              <RiShoppingCartFill />
            </Link>
          </button>
        </div>
      </article>

      {/* search section for devices having screens less than 850px  */}
      {width < 850 && (
        <div id="search_mobile">
          <form
            id="search_mobile_form"
            method="get"
            className="flex justify-center border  border-black text-base focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 max-sm:text-sm"
          >
            {/* Categories */}
            <select
              name="categories"
              id="categories_mobile"
              className="border border-black bg-white text-center outline-none"
            >
              <option value="All">All</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
            </select>

            {/* Search Bar */}
            <input
              type="search"
              name="search"
              id="search"
              className="w-full border border-black px-2  outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search"
            />
            {/* Search button */}
            <button
              type="submit"
              id="submit_search_mobile"
              className="border border-black bg-blue-300 p-1 text-3xl max-lg:text-2xl"
            >
              <MdSearch />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
