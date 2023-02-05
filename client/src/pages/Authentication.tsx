import React, { useEffect } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import "../App.css";
import { Link } from "react-router-dom";

const toggleExpand = () => {
  //login elements
  const loginButton: HTMLInputElement | null =
    document.querySelector("#login_button")!;
  const loginBox: HTMLInputElement | null = document.querySelector("#login")!;

  //register elements
  const registerButton: HTMLInputElement | null =
    document.querySelector("#register_button")!;
  const registerBox: HTMLElement | null = document.getElementById("register")!;

  if (loginButton?.checked) {
    loginBox.style.overflow = "auto";
    loginBox.classList.add("h-auto");
    loginBox.classList.remove("h-12");
    loginBox.classList.remove("bg-gray-200");
    loginBox.classList.add("bg-white");
  } else {
    loginBox.style.overflow = "hidden";
    loginBox.classList.remove("h-auto");
    loginBox.classList.add("h-12");
    loginBox.classList.add("bg-gray-200");
    loginBox.classList.remove("bg-white");
  }

  if (registerButton?.checked) {
    registerBox.classList.remove("bg-gray-200");
    registerBox.classList.remove("h-12");
    registerBox.classList.add("h-auto");
    registerBox.style.overflow = "auto";
    registerBox.classList.add("bg-white");
  } else {
    registerBox.classList.add("bg-gray-200");
    registerBox.classList.add("h-12");
    registerBox.classList.remove("h-auto");
    registerBox.style.overflow = "hidden";

    registerBox.classList.remove("bg-white");
    registerBox.classList.add("bg-gray-200");
  }
};

export default function Authentication() {
  // on load
  useEffect(() => {
    const loginButton: HTMLInputElement | null =
      document.querySelector("#login_button")!;
    loginButton.checked = true;
  }, []);

  return (
    <article className="grid h-[100vh] grid-rows-[0.8fr,8fr,1.2fr]">
      <header className="flex items-center border border-black bg-sky-900">
        <Link to="/" className="p-4 text-3xl text-white">
          SStore
        </Link>
      </header>
      <main className="flex flex-col items-center justify-center  bg-blue-100">
        <section
          className="h-12 w-96 overflow-hidden rounded-t border border-black bg-gray-200 p-2 max-vs:w-[90%]"
          id="register"
        >
          <div className="grid  grid-cols-[0.1fr,1fr] items-center ">
            <input
              type="radio"
              name="authentication"
              id="register_button"
              className="cursor-pointer"
              onChange={toggleExpand}
            />
            <label
              htmlFor="register_button"
              className="flex cursor-pointer items-center gap-2"
            >
              <h2 className="text-lg max-vs:text-base">Register</h2>
              <h3 className="text-sm max-vs:text-xs">New to SStore?</h3>
            </label>
          </div>
          <div id="register_box">
            <Register />
          </div>
        </section>
        <section
          className=" w-96 rounded-b border border-black  bg-white p-2 max-vs:w-[90%]"
          id="login"
        >
          <div className="grid grid-cols-[0.1fr,1fr] items-center">
            <input
              type="radio"
              name="authentication"
              className="cursor-pointer"
              id="login_button"
              onChange={toggleExpand}
            />
            <label
              htmlFor="login_button"
              className="flex cursor-pointer items-center gap-2"
            >
              <h2 className="text-lg max-vs:text-base">Login</h2>
              <h3 className="text-sm max-vs:text-xs">Already a customer?</h3>
            </label>
          </div>
          <div id="login_box">
            <Login />
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-evenly  border border-black bg-sky-900 text-center text-sm text-white max-vs:text-xs">
        <span>
          <ul className="flex gap-5">
            <li>Condition of Use</li>
            <li>Privacy Notice</li>
            <li>Interest Based Ads</li>
          </ul>
        </span>
        <span className="">&copy; Skysparko.pvt.lmt ,2023</span>
      </footer>
    </article>
  );
}
