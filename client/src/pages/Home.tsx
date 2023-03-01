import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector(
    (state: {
      user: {
        email: string;
        isAuthenticated: boolean;
        name: string;
        gender: string;
        role: string;
        id: string;
        pfp: string;
      };
    }) => state.user
  );
  useEffect(() => {});
  return (
    <div className="h-[2000px] bg-gray-100">
      {user.isAuthenticated
        ? `Your name is ${user.name} and email is ${user.email} and role is ${user.role} and your id is ${user.id}`
        : "you are not authenticated"}
    </div>
  );
}
