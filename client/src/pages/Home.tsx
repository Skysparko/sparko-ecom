import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="py-[100%] text-center ">
      <Link
        to="/login"
        className="rounded border-2 border-black bg-blue-500 py-1 px-3 text-2xl  text-white"
      >
        Login
      </Link>
    </div>
  );
}
