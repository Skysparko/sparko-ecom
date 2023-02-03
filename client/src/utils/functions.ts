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
