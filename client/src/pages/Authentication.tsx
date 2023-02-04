import React, { useEffect } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import "../App.css";

const toggleExpand = () => {
  //login elements
  const loginButton: HTMLInputElement | null =
    document.querySelector("#login_button")!;
  const loginBox: HTMLInputElement | null =
    document.querySelector("#login_box")!;

  //register elements
  const registerButton: HTMLInputElement | null =
    document.querySelector("#register_button")!;
  const registerBox: HTMLElement | null =
    document.getElementById("register_box")!;

  if (loginButton?.checked) {
    loginBox.style.overflow = "auto";
    loginBox.classList.remove("h-0");
  } else {
    loginBox.style.overflow = "hidden";
    loginBox.classList.add("h-0");
  }

  if (registerButton?.checked) {
    registerBox.style.overflow = "auto";
    registerBox.classList.remove("h-0");
  } else {
    registerBox.style.overflow = "hidden";
    registerBox.classList.add("h-0");
  }
};

export default function Authentication() {
  //on load
  useEffect(() => {
    const loginButton: HTMLInputElement | null =
      document.querySelector("#login_button")!;
    loginButton.checked = true;
  }, []);

  return (
    <article className="flex flex-col items-center justify-center border border-black ">
      <section className="border border-black">
        <div>
          <input
            type="radio"
            name="authentication"
            id="register_button"
            onChange={toggleExpand}
          />
          <label htmlFor="register_button">Register</label>
        </div>
        <div className="h-0  overflow-hidden" id="register_box">
          <Register />
        </div>
      </section>
      <section className="border border-black">
        <div>
          <input
            type="radio"
            name="authentication"
            id="login_button"
            onChange={toggleExpand}
          />
          <label htmlFor="login_button">Login</label>
        </div>
        <div id="login_box">
          <Login />
        </div>
      </section>
    </article>
  );
}
