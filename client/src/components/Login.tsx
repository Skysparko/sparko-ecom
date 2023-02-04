import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import Home from "../pages/Home";

type Submit = {
  email: string;
  password: string;
};

const submit = (
  e: React.FormEvent<HTMLFormElement>,
  { email, password }: Submit
) => {
  e.preventDefault();
  console.log();
  console.log({ email, password });
  axios.defaults.withCredentials = true;
  axios
    .post("http://localhost:8080/api/v1/user/login", {
      email,
      password,
    })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        alert("Login successful");
      }
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div className="  flex  flex-col items-center justify-center">
      <h1 className=" text-center text-5xl font-medium">Login</h1>
      <form
        method="post"
        className="mt-8 mb-5 flex w-48 flex-col gap-5"
        onSubmit={(e) => submit(e, { email, password })}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="px-2"
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-2"
          required
          minLength={8}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          onChange={(e) => setPassword(e.target.value)}
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
