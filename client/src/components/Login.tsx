import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="  flex h-[100vh] flex-col items-center justify-center">
      <h1 className=" text-center text-5xl font-medium">Login</h1>
      <form method="post" className="mt-8 mb-5 flex w-48 flex-col gap-5">
        <input type="email" name="email" placeholder="Email" className="px-2" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-2"
        />

        <button
          type="submit"
          className="m-auto w-20 rounded border-2 border-black bg-blue-500 py-1 px-3 text-white"
        >
          Login
        </button>
      </form>
      <h3 className=" cursor-pointer text-right text-xs text-blue-700">
        forgot password?
      </h3>

      <h4 className="mt-5 text-sm">New Customer?</h4>
      <Link to="/register" className="  text-[0.85rem] text-blue-700">
        Register here
      </Link>
    </div>
  );
}
