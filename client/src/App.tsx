import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Authentication from "./components/auth/Authentication";
import Cart from "./pages/Cart";
import { createContext, useEffect, useState } from "react";
import { instance } from "./utils/functions";
import Signing from "./pages/auth/Signing";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// export type User = {
//   name: string;
//   id: string;
//   email: string;
//   role: string;
// };

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    id: "",
    pfp: "",
  });
  useEffect(() => {
    window.addEventListener("load", () => {
      instance
        .post("user/authenticate")
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);

            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout isAuthenticated={isAuthenticated} user={user} />}
        >
          <Route
            index
            element={<Home isAuthenticated={isAuthenticated} user={user} />}
          />
          <Route
            path="cart"
            element={<Cart isAuthenticated={isAuthenticated} user={user} />}
          />
        </Route>
        {!isAuthenticated && (
          <Route path="/authentication" element={<Authentication />}>
            <Route index element={<Signing />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
