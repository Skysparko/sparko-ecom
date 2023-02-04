import React from "react";
import { Link } from "react-router-dom";
import { instance } from "../utils/functions";

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
    <div className="m-auto flex  flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-5xl font-medium">Register</h1>
      <form
        method="post"
        className=" flex w-48 flex-col gap-5"
        onSubmit={(e) =>
          submit(e, { username, email, password, confirmPassword })
        }
      >
        <input
          type="text"
          name="username"
          placeholder="Name"
          className="px-2"
          required
          onChange={(e) => setUsername(e.target.value)}
          pattern="^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$"
          minLength={3}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="px-2"
          required
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-2"
          required
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="px-2"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={8}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        />

        <button
          type="submit"
          className=" m-auto w-24 rounded border-2 border-black bg-blue-500 py-1 px-3 text-white"
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
