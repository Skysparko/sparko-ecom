import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { scrollToTop } from "../utils/functions";

export default function Footer(): JSX.Element {
  return (
    <div className="border border-black  text-center text-sm text-white max-sm:text-xs ">
      <div
        className="flex cursor-pointer items-center justify-center gap-5 bg-sky-800 py-3 text-base hover:bg-sky-700 max-sm:gap-2 max-sm:text-sm"
        onClick={() =>
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        Back to top
        <IoIosArrowUp />
      </div>
      <div className="flex w-full justify-evenly bg-sky-900 py-4 max-sm:gap-5">
        <span>
          <h1 className="text-base font-medium max-sm:text-sm">
            Get to Know us
          </h1>
          <ul className="flex flex-col gap-2 py-2">
            <li>About us</li>
            <li>Contact us</li>
            <li>SStore Stories</li>
          </ul>
        </span>
        <span>
          <h1 className="text-base font-medium max-sm:text-sm">
            Connect with Us
          </h1>
          <ul className="flex flex-col gap-2 py-2">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </span>
        <span>
          <h1 className="text-base font-medium max-sm:text-sm">
            Let Us Help You
          </h1>
          <ul className="flex flex-col gap-2 py-2">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
          </ul>
        </span>
      </div>
      <div className="bg-slate-700 py-2">
        <span>
          <ul className="flex  justify-center gap-5 py-2">
            <li>Condition of Use</li>
            <li>Privacy Notice</li>
            <li>Interest Based Ads</li>
          </ul>
        </span>
        <span className="">&copy; Skysparko.pvt.lmt ,2023</span>
      </div>
    </div>
  );
}
