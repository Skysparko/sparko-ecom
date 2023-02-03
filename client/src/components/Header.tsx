import React, { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight, MdSearch } from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import "../App.css";
import SideBar, { openSidebar } from "./SideBar";

export default function Header() {
  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth > 0 ? window.innerWidth : screen.width);
    });
    console.log("width: " + width);
    const searchDesktop: HTMLElement | null =
      document.getElementById("search_desktop");
    const searchMobile: HTMLElement | null =
      document.getElementById("search_mobile");
    const header: HTMLElement | null = document.getElementById("header");
    const searchMobileForm: HTMLElement | null =
      document.getElementById("search_mobile_form");
    const submitSearch: HTMLElement | null = document.getElementById(
      "submit_search_mobile"
    );
    const categories: HTMLElement | null =
      document.getElementById("categories_mobile");

    if (width < 850) {
      searchDesktop?.classList.add("hidden");
      searchMobile?.classList.remove("hidden");
      header?.classList.remove("grid-cols-[1fr,2.5fr,1fr]");
      header?.classList.add("grid-cols-[1fr,1fr]");
      searchMobileForm?.classList.remove("rounded-md");
      submitSearch?.classList.remove("rounded-r-md");
      categories?.classList.remove("rounded-l-md");
      header?.classList.remove("border", "border-black");
    } else {
      searchDesktop?.classList.remove("hidden");
      searchMobile?.classList.add("hidden");
      header?.classList.remove("grid-cols-[1fr,1fr]");
      header?.classList.add("grid-cols-[1fr,2.5fr,1fr]");
      header?.classList.add("border", "border-black");
    }
  });

  return (
    // Three grid containing name search and function
    <>
      <aside>
        <SideBar />
      </aside>
      <article
        id="header"
        className="grid grid-cols-[1fr,2.5fr,1fr] border border-black py-2 text-2xl max-lg:text-xl  max-md:text-lg"
      >
        {/* hamburger column and the name of the company */}
        <div className=" flex  items-center  gap-5  pl-5 text-3xl max-lg:text-2xl max-md:gap-2 max-md:pl-2 max-sm:text-[1.4rem]">
          <button className="cursor-pointer" onClick={openSidebar}>
            <VscThreeBars />
          </button>

          <h1 className="cursor-pointer">SStore</h1>
        </div>

        {/* Ui for search */}

        <div id="search_desktop">
          <form
            id="search_desktop_form"
            method="get"
            className="flex justify-center rounded-md border  border-black text-base focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 "
          >
            <select
              name="categories"
              id="categories_desktop"
              className="rounded-l-md border border-black bg-white text-center outline-none"
            >
              <option value="All">All</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
            </select>
            <input
              type="search"
              name="search"
              id="search"
              className="w-full border border-black px-2  outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search"
            />
            <button
              type="submit"
              id="submit_search_desktop"
              className="rounded-r-md border border-black bg-blue-300 p-1 text-3xl max-lg:text-2xl"
            >
              <MdSearch />
            </button>
          </form>
        </div>

        {/* section containing login and cart  */}
        <div className=" flex justify-end gap-10  pr-5 max-md:gap-5">
          <span className="flex items-center">
            <h3 className="">Login</h3>

            <MdOutlineKeyboardArrowRight size={15} />

            <FaUserAlt />
          </span>
          <button className="text-3xl max-lg:text-2xl">
            <RiShoppingCartFill />
          </button>
        </div>
      </article>
      <div id="search_mobile">
        <form
          id="search_mobile_form"
          method="get"
          className="flex justify-center rounded-md border  border-black text-base focus-within:outline focus-within:outline-2 focus-within:outline-blue-300"
        >
          <select
            name="categories"
            id="categories_mobile"
            className="rounded-l-md border border-black bg-white text-center outline-none"
          >
            <option value="All">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
          <input
            type="search"
            name="search"
            id="search"
            className="w-full border border-black px-2  outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search"
          />
          <button
            type="submit"
            id="submit_search_mobile"
            className="rounded-r-md border border-black bg-blue-300 p-1 text-3xl max-lg:text-2xl"
          >
            <MdSearch />
          </button>
        </form>
      </div>
    </>
  );
}
