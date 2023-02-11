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
import Authentication from "./pages/Authentication";
import Cart from "./pages/Cart";
import { createContext, useEffect, useState } from "react";
import { instance } from "./utils/functions";
import Signing from "./pages/Signing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export type User = {
  name: string;
  id: string;
  email: string;
  role: string;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //! useState is not working it is not setting up the values
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    id: "",
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
          <Route path="cart" element={<Cart />} />
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
