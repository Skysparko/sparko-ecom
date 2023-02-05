import React from "react";
import { Link } from "react-router-dom";
import { instance } from "../utils/functions";
import { BsInfoLg } from "react-icons/bs";

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
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  return (
    <div className=" my-7 flex flex-col items-center justify-center  ">
      <form
        method="post"
        className=" flex w-72 flex-col gap-5 max-sm:w-56 max-sm:gap-3 "
        onSubmit={(e) =>
          submit(e, { username, email, password, confirmPassword })
        }
      >
        <input
          type="text"
          name="username"
          placeholder="Name"
          className="rounded border-2 border-gray-600 p-2 px-2 outline-blue-600 max-sm:text-sm"
          required
          onChange={(e) => setUsername(e.target.value)}
          pattern="^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$"
          minLength={3}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="rounded border-2 border-gray-600 p-2 px-2 outline-blue-600  max-sm:text-sm"
          required
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="rounded border-2 border-gray-600 p-2 px-2 outline-blue-600  max-sm:text-sm "
          required
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="rounded border-2 border-gray-600 p-2 px-2 outline-blue-600  max-sm:text-sm"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={8}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        />

        <span className=" ">
          <h2 className="grid grid-cols-[0.1fr,1fr]  text-[0.75rem]">
            <BsInfoLg /> Password must be at least 8 characters long and contain
            at least 1 uppercase, 1 lowercase, 1 number
          </h2>
        </span>

        <button
          type="submit"
          className=" m-auto w-24 rounded border-2 border-black bg-blue-500 py-1 px-3 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
