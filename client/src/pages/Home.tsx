import React from "react";
import { Link } from "react-router-dom";
import { instance } from "../utils/functions";

const testClick = () => {
  instance
    .get("user/get")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const logout = () => {
  instance
    .get("user/logout")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  window.location.reload();
};

export default function Home() {
  console.log();
  return (
    <div className="flex h-[100vh] items-center justify-center text-center ">
      <Link
        to="/login"
        className="rounded border-2 border-black bg-blue-500 py-1 px-3 text-2xl  text-white"
      >
        Login
      </Link>
    </div>
  );
}
