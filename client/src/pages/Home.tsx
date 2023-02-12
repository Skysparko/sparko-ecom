import React from "react";

interface PropTypes {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
  };
}

export default function Home({ isAuthenticated, user }: PropTypes) {
  return (
    <div className="h-[2000px] bg-gray-100">
      {isAuthenticated
        ? `Your name is ${user.name} and email is ${user.email} and role is ${user.role} and your id is ${user.id}`
        : "you are not authenticated"}
    </div>
  );
}
