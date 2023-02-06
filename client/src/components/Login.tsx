import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "../App.css";
import { useState } from "react";
import { passwordViewToggler } from "../utils/functions";

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
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="  my-7 flex  flex-col items-center justify-center   ">
      <form
        method="post"
        className=" flex w-72 flex-col gap-5  max-vs:w-[95%]"
        onSubmit={(e) => submit(e, { email, password })}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" rounded border-2 border-gray-600 p-2 px-2 shadow-inner outline-blue-600
          max-vs:text-sm max-vxs:text-xs"
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
          required
        />
        <span className="flex">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            className="w-72 rounded border-2 border-gray-600 p-2 px-2 pr-10 shadow-inner
          outline-blue-600 max-vs:w-[100%] max-vs:text-sm max-vxs:text-xs"
            required
            minLength={8}
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="-ml-8 mt-3  cursor-pointer text-xl max-vs:mt-[0.7rem] max-vs:text-lg max-vxs:mt-[0.6rem] max-vxs:-ml-7 max-vxs:text-base"
            id="password_show_toggler"
          >
            {showPassword ? (
              <BsEye
                onClick={() =>
                  passwordViewToggler(showPassword, setShowPassword)
                }
              />
            ) : (
              <BsEyeSlash
                onClick={() =>
                  passwordViewToggler(showPassword, setShowPassword)
                }
              />
            )}
          </span>
        </span>

        <span
          className="flex items-center justify-between 
         max-vs:text-xs"
        >
          <span className="flex items-center gap-1">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="text-sm"
            />
            <label htmlFor="remember">Remember me</label>
          </span>
          <h3 className=" cursor-pointer justify-self-end text-right text-sm text-blue-700 max-vs:text-xs">
            forgot password?
          </h3>
        </span>

        <button
          type="submit"
          className=" rounded border-2 border-black bg-blue-500 py-1 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
