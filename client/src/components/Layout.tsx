import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
}
