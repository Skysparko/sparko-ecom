import React, { useEffect } from "react";
import { BiEdit, BiLogOut } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import {
  MdHelpOutline,
  MdOutlineLocationOn,
  MdOutlinePayments,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth.functions";

export default function User() {
  useEffect(() => {
    const div = document.querySelectorAll("#user_menu li");

    div.forEach((e) => {
      // remove the class from the others
      div.forEach((d) => d.classList.remove("text-black"));
      div.forEach((d) => d.classList.remove("border-r-4"));
      div.forEach((d) => d.classList.remove("border-r-sky-700"));
      div.forEach((d) => d.classList.add("text-gray-500"));
    });
    const pageUrl = location.href.split("/");
    const page = document.getElementById(pageUrl[pageUrl.length - 1]);
    page?.classList.remove("text-gray-500");
    page?.classList.add("border-r-4", "border-r-sky-700", "text-black");
  });
  const navigate = useNavigate();
  return (
    <section className="grid  grid-cols-[1fr,4fr] max-lg:grid-cols-1">
      <aside className="flex flex-col border-2 border-black max-lg:hidden">
        <h1 className="mt-5 text-center text-3xl">My Dashboard</h1>
        <ul className="mt-14 text-[1.2rem]" id="user_menu">
          <li
            id="dashboard"
            className=" flex cursor-pointer items-center gap-2 border-y p-5  text-gray-500   hover:border-r-4 hover:border-r-sky-700 hover:text-black 
            "
            onClick={() => navigate("/dashboard")}
          >
            <BiEdit />
            Overview
          </li>

          <li
            id="orders"
            className=" flex cursor-pointer items-center  gap-2 p-5 text-gray-500 hover:border-r-4 hover:border-r-sky-700 hover:text-black"
            onClick={() => navigate("/dashboard/orders")}
          >
            <MdOutlineShoppingBag />
            Orders
          </li>
          <li
            id="products"
            className=" flex cursor-pointer items-center gap-2 border border-y p-5 text-gray-500 hover:border-r-4 hover:border-r-sky-700 hover:text-black"
            onClick={() => navigate("/dashboard/products")}
          >
            <MdOutlinePayments />
            Products
          </li>
          <li
            id="customers"
            className=" flex cursor-pointer items-center  gap-2 p-5 text-gray-500 hover:border-r-4 hover:border-r-sky-700 hover:text-black"
            onClick={() => navigate("/dashboard/customers")}
          >
            <MdOutlineLocationOn />
            Customers
          </li>
          <li
            id="reports"
            className=" flex cursor-pointer items-center gap-2 border-y p-5 text-gray-500 hover:border-r-4 hover:border-r-sky-700 hover:text-black"
            onClick={() => navigate("/dashboard/reports")}
          >
            <MdHelpOutline />
            Reports
          </li>
          <li
            id="transactions"
            className=" flex cursor-pointer items-center gap-2 border-y p-5 text-gray-500 hover:border-r-4 hover:border-r-sky-700 hover:text-black"
            onClick={() => navigate("/dashboard/transactions")}
          >
            <MdHelpOutline />
            Transactions
          </li>
          <li
            id="shipments"
            className=" flex cursor-pointer items-center gap-2 border-y p-5 text-gray-500 hover:border-r-4 hover:border-r-sky-700 hover:text-black"
            onClick={() => navigate("/dashboard/shipments")}
          >
            <MdHelpOutline />
            Shipments
          </li>
        </ul>
        <div className="flex grow items-end p-5 text-red-600  hover:text-[#eb0202]">
          <span
            onClick={logout}
            className="inline-flex cursor-pointer items-center gap-2"
          >
            <BiLogOut />
            <h1>Logout</h1>
          </span>
        </div>
      </aside>
      <main className="">
        <Outlet />
      </main>
    </section>
  );
}
