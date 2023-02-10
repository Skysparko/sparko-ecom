import React from "react";

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
    <div className="h-[2000px]">
      {isAuthenticated
        ? `Your name is ${user.name} and email is ${user.email} and role is ${user.role} and your id is ${user.id}`
        : "you are not authenticated"}
    </div>
  );
}
