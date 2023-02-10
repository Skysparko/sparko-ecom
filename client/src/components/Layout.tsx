import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutPropTypes {
  isAuthenticated: boolean;
  user: Object;
}

export default function Layout({ isAuthenticated, user }: LayoutPropTypes) {
  return (
    <div>
      <header>
        <Header isAuthenticated={isAuthenticated} user={user}/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
