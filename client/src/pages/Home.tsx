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
  user: Object;
}

export default function Home({ isAuthenticated, user }: PropTypes) {
  return (
    <div className="h-[2000px]">
      {isAuthenticated ? "You are authenticated" : "you are not authenticated"}
    </div>
  );
}
