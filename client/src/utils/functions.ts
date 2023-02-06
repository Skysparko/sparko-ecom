import axios from "axios";

//this function take name as parameter and return its value
export const getCookie = (cookieName: string) => {
  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith(cookieName));

  return cookie ? cookie.split("=")[1] : null;
};

//axios instance method for api requests
export const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    authorization: `Bearer ${getCookie("bearerToken")}`,
  },
  withCredentials: true,
  timeout: 1000,
});

//This function is Use to toggle password Show and Hide it accepts two variable from useState hook and string like this (#id) for password input id
export const passwordViewToggler = (
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  setShowPassword(!showPassword);
  const password: HTMLInputElement | null = document.querySelector(id)!;
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
};
