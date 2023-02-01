import React from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";

type Submit = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const submit = (
  e: React.FormEvent<HTMLFormElement>,
  { name, email, password, confirmPassword }: Submit
) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  console.log({ name, email, password, confirmPassword });
  axios
    .post("http://localhost:8080/api/v1/user/register", {
      username: name,
      email,
      password,
    })
    .then((res: AxiosResponse) => {
      if (res.status === 201) {
        alert("Registration successful");
        window.location.href = "/login";
      }
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  return (
    <div className="m-auto flex h-[100vh] flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-5xl font-medium">Register</h1>
      <form
        method="post"
        className=" flex w-48 flex-col gap-5"
        onSubmit={(e) => submit(e, { name, email, password, confirmPassword })}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="px-2"
          required
          onChange={(e) => setName(e.target.value)}
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
