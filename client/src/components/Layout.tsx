import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { User } from "../App";

interface PropTypes {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
    pfp: string;
  };
}

export default function Layout({ isAuthenticated, user }: PropTypes) {
  return (
    <div>
      <header>
        <Header isAuthenticated={isAuthenticated} user={user} />
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
