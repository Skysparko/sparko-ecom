import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { User } from "../App";

export default function Layout() {
  return (
    <div>
      {/* header */}
      <header className="mb-14 max-lg:mb-20">
        <Header />
      </header>
      {/* main */}
      <main>
        <Outlet />
      </main>
      {/* footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
