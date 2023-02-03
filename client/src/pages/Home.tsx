import React from "react";
import { Link } from "react-router-dom";
import { instance } from "../utils/functions";

// const testClick = () => {
//   instance
//     .get("user/get")
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// const logout = () => {
//   instance
//     .get("user/logout")
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   window.location.reload();
// };

export default function Home() {
  return <div className="">Home</div>;
}
