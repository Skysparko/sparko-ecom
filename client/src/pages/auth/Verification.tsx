import React, { useEffect, useState } from "react";
import { instance } from "../../utils/functions";
import { Link } from "react-router-dom";

export default function Verification() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token")!;
    instance
      .post("user/verify-email", { token })
      .then((res) => {
        if (res.status === 200) {
          setResponse(res.data);
        }
      })
      .catch((err) => {
        setResponse("Your verification link is invalid . Please try again");
      });
  });
  return (
    <div>
      <h1 className="text">{response}</h1>
      <Link to="/authentication">Login</Link>
    </div>
  );
}
