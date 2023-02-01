import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";

const testClick = () => {
  console.log(document.cookie);
  axios
    .get(`http://localhost:8080/api/v1/user/get`, {})
    .then((res: AxiosResponse) => {
      res.data;
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
};

export default function Home() {
  return (
    <div className="flex h-[100vh] items-center justify-center text-center ">
      <Link
        to="/login"
        className="rounded border-2 border-black bg-blue-500 py-1 px-3 text-2xl  text-white"
      >
        Login
      </Link>
      <button
        onClick={testClick}
        className="rounded border-2 border-black bg-blue-500 py-1 px-3 text-2xl  text-white"
      >
        Get Your Details
      </button>
    </div>
  );
}
