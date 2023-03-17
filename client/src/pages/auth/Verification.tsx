import React, { useEffect, useState } from "react";
import { instance } from "../../utils/functions";
import { Link } from "react-router-dom";

export default function Verification() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token")!;
    console.log(token);
    instance
      .post("auth/verify-email", { token })
      .then((res) => {
        if (res.status === 200) {
          setResponse(res.data);
        }
      })
      .catch((err) => {
        setResponse(err.response.data.message);
      });
  }, []);
  return (
    <div>
      <h1 className="text">{response}</h1>
      <Link to="/authentication">Login</Link>
    </div>
  );
}
