import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="m-auto w-48 ">
      <h1 className="mt-40 mb-8 text-center text-5xl font-medium">Register</h1>
      <form method="post" className="m-auto flex w-48 flex-col gap-5">
        <input type="text" name="name" placeholder="Name" className="px-2" />
        <input type="email" name="email" placeholder="Email" className="px-2" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-2"
        />

        <button
          type="submit"
          className="m-auto w-24 rounded border-2 border-black bg-blue-500 py-1 px-3 text-white"
        >
          Register
        </button>
      </form>

      <h4 className="mt-8 text-sm">Already a Customer?</h4>
      <Link to="/login" className="text-[0.85rem] text-blue-700">
        Login here
      </Link>
    </div>
  );
}
