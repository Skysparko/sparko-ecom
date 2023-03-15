import React, { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { FaRegUserCircle, FaUserAlt } from "react-icons/fa";
import {
  MdHelpOutline,
  MdOutlineKeyboardArrowRight,
  MdOutlineLocationOn,
  MdOutlinePayments,
  MdSearch,
} from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import SideBar, { openSidebar } from "./SideBar";
import { useNavigate, Link } from "react-router-dom";

import { BiEdit, BiLogOut } from "react-icons/bi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { logout } from "../utils/authFunctions";
import { RxDashboard } from "react-icons/rx";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();

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
      };
    }) => state.user
  );
  //logic for responsive design
  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );

  const [profileMenu, setProfileMenu] = useState(false);

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
    document.addEventListener("click", (e) => {
      const userImage: HTMLElement | null =
        document.getElementById("user_image");
      if (e.target != userImage) {
        setProfileMenu(false);
      }
    });
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
        <div className=" max-lg:text-2x  flex  items-center  gap-5 pl-5 text-3xl text-white max-md:pl-2 max-sm:gap-2 max-sm:text-[1.4rem]">
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
        <div className=" flex  justify-end gap-10  pr-10 text-xl text-white max-lg:pr-5 max-sm:gap-5 max-sm:text-[1.15rem] max-xs:text-[1rem]">
          {user.isAuthenticated ? (
            //User section
            <section id="user_icon" className="pt-1 max-sm:pt-[0.2rem]">
              <img
                id="user_image"
                src={user.pfp}
                alt={user.name}
                className="w-10 cursor-pointer  rounded-full max-lg:w-8 max-sm:w-7"
                onClick={() => setProfileMenu(!profileMenu)}
              />
              {profileMenu && (
                <div
                  id="user_profile_menu"
                  className="absolute right-14 mt-3 w-60 rounded-lg bg-white p-2 text-base text-black shadow-lg max-lg:right-8 max-lg:w-56 max-lg:text-[0.9rem] max-sm:hidden"
                >
                  <span className="absolute right-14 -top-2 float-right h-5 w-5 rotate-45  bg-white"></span>
                  <ul>
                    {user.isAuthenticated && user.role === "owner" && (
                      <li className="flex items-center gap-2 border-b   p-1.5 ">
                        <RxDashboard />
                        <Link to="/dashboard">My Dashboard</Link>
                      </li>
                    )}
                    <li className="flex items-center gap-2  p-1.5 ">
                      <FaRegUserCircle />
                      <Link to="/account">My Account</Link>
                    </li>
                    <li className="flex items-center gap-2 border-y p-1.5 ">
                      <BiEdit />
                      <Link to="/user">Edit Profile</Link>
                    </li>

                    <li className="flex items-center gap-2  p-1.5 ">
                      <MdOutlineShoppingBag />
                      <Link to="/user/orders">Orders</Link>
                    </li>
                    <li className="border- flex items-center gap-2 border-y p-1.5 ">
                      <MdOutlinePayments />
                      <Link to="/user/payment">Payment Options</Link>
                    </li>
                    <li className="flex items-center gap-2  p-1.5 ">
                      <MdOutlineLocationOn />
                      <Link to="/user/addresses">Manage Addresses</Link>
                    </li>
                    <li className="flex items-center gap-2 border-y p-1.5 ">
                      <MdHelpOutline />

                      <Link to="/user/help">Help</Link>
                    </li>
                    <li
                      className="flex cursor-pointer items-center  gap-2 p-1.5 "
                      onClick={logout}
                    >
                      <BiLogOut />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </section>
          ) : (
            /* Login section */
            <span
              className="flex cursor-pointer items-center"
              onClick={() => navigate("/authentication")}
            >
              {width > 250 && (
                <span className="flex cursor-pointer items-center">
                  <h3>Login</h3>
                  <MdOutlineKeyboardArrowRight />
                </span>
              )}

              <FaUserAlt />
            </span>
          )}
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
