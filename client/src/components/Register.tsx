import React from "react";
import { Link } from "react-router-dom";
import { instance, passwordViewToggler } from "../utils/functions";
import { BsEye, BsEyeSlash, BsInfoLg } from "react-icons/bs";
import { useState } from "react";

type Submit = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const submit = (
  e: React.FormEvent<HTMLFormElement>,
  { username, email, password, confirmPassword }: Submit
) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  instance
    .post("user/register", { username, email, password })
    .then((res) => {
      if (res.status === 201) {
        alert("Registration successful");
        window.location.href = "/login";
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    // This division have a form containing the username, email,password and confirm Password fields and password requirements and a submit button

    <div className=" my-7 flex flex-col items-center justify-center  ">
      <form
        method="post"
        className=" flex w-72 flex-col gap-5 max-vs:w-[95%] max-vs:gap-3 "
        onSubmit={(e) =>
          submit(e, { username, email, password, confirmPassword })
        }
      >
        {/* Username Input Field */}
        <input
          type="text"
          name="username"
          placeholder="Name"
          className="rounded border-2 border-gray-600 p-2 px-2 shadow-inner outline-blue-600
          max-vs:text-sm max-vxs:text-xs"
          required
          onChange={(e) => setUsername(e.target.value)}
          pattern="^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$"
          minLength={3}
        />
        {/* Email input Field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="rounded border-2 border-gray-600 p-2 px-2 shadow-inner  outline-blue-600 max-vs:text-sm max-vxs:text-xs"
          required
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
        />
        {/* Password Field */}
        <span className="flex">
          {/* Password Input Bar */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="register_password"
            className="w-72 rounded border-2 border-gray-600 p-2 px-2 pr-10 shadow-inner
          outline-blue-600 max-vs:w-[100%] max-vs:text-sm max-vxs:text-xs"
            required
            minLength={8}
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Password View Toggle Button */}
          <span
            className="-ml-8 mt-3  cursor-pointer text-xl max-vs:mt-[0.7rem] max-vs:text-lg max-vxs:mt-[0.6rem] max-vxs:-ml-7 max-vxs:text-base"
            id="password_show_toggler"
          >
            {/* Toggle password show or hide */}
            {showPassword ? (
              <BsEye
                onClick={() =>
                  //console.log("#register_password")
                  passwordViewToggler(
                    showPassword,
                    setShowPassword,
                    "#register_password"
                  )
                }
              />
            ) : (
              <BsEyeSlash
                onClick={
                  () =>
                    passwordViewToggler(
                      showPassword,
                      setShowPassword,
                      "#register_password"
                    )
                  // console.log("#register_password")
                }
              />
            )}
          </span>
        </span>

        {/*Confirm Password Field */}
        <span className="flex">
          {/*Confirm Password Input Bar */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            id="register_confirm_password"
            className="w-72 rounded border-2 border-gray-600 p-2 px-2 pr-10 shadow-inner
          outline-blue-600 max-vs:w-[100%] max-vs:text-sm max-vxs:text-xs"
            required
            minLength={8}
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/*Confirm Password View Toggle Button */}
          <span
            className="-ml-8 mt-3  cursor-pointer text-xl max-vs:mt-[0.7rem] max-vs:text-lg max-vxs:mt-[0.6rem] max-vxs:-ml-7 max-vxs:text-base"
            id="password_show_toggler"
          >
            {/* Toggle Confirm password show or hide */}
            {showConfirmPassword ? (
              <BsEye
                onClick={() =>
                  // console.log("#register_confirm_password")
                  passwordViewToggler(
                    showConfirmPassword,
                    setShowConfirmPassword,
                    "#register_confirm_password"
                  )
                }
              />
            ) : (
              <BsEyeSlash
                onClick={() =>
                  // console.log("#register_confirm_password")
                  passwordViewToggler(
                    showConfirmPassword,
                    setShowConfirmPassword,
                    "#register_confirm_password"
                  )
                }
              />
            )}
          </span>
        </span>

        {/* This contains information about password requirements */}
        <span>
          <h2 className="grid grid-cols-[0.1fr,1fr]  text-[0.75rem]">
            <BsInfoLg /> Password must be at least 8 characters long and contain
            at least 1 uppercase, 1 lowercase, 1 number
          </h2>
        </span>
        {/* Register Button (Form Submit) */}
        <button
          type="submit"
          className="  rounded border-2 border-black bg-blue-500 py-1 px-3 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
