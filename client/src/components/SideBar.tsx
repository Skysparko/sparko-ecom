import React from "react";
import { RxCross1 } from "react-icons/rx";

const closeSidebar = () => {
  document.getElementById("header__sidebar")?.classList.add("-left-48");
  document.getElementById("header__sidebar")?.classList.remove("left-0");
};

export const openSidebar = () => {
  document.getElementById("header__sidebar")?.classList.add("left-0");
  document.getElementById("header__sidebar")?.classList.remove("-left-48");
};

export default function SideBar() {
  return (
    <div
      id="header__sidebar"
      className="absolute -left-48 top-0 flex  border border-black bg-white text-center text-2xl transition-all duration-500 ease-in-out"
    >
      <section className="border border-black">
        <h1 className="text-3xl">SStore</h1>
        <ul>
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ul>
      </section>
      <button className="cursor-pointer self-start" onClick={closeSidebar}>
        <RxCross1 />
      </button>
    </div>
  );
}
