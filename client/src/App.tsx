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
import User from "./components/user/User";
import UserProfile from "./pages/user/UserProfile";
import Orders from "./pages/user/Orders";
import Addresses from "./pages/user/Addresses";
import Payment from "./pages/user/Payment";
import MyAccount from "./pages/MyAccount";
import Help from "./pages/user/Help";
import { BallTriangle } from "react-loader-spinner";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardLayout from "./components/Dashboard/DashboardLayout";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    id: "",
    pfp: "",
  });
  useEffect(() => {
    // window.addEventListener("load", () => {
    instance
      .post("user/authenticate")
      .then((res) => {
        if (res.status === 200) {
          setUser({
            name: res.data.user.username,
            email: res.data.user.email,
            role: res.data.user.role,
            id: res.data.user._id,
            pfp: res.data.user.profileImage,
          });
          setIsLoading(false);
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
    // });
    // return () =>
    //   window.removeEventListener("load", () => {
    //     instance
    //       .post("user/authenticate")
    //       .then((res) => {
    //         if (res.status === 200) {
    //           setUser(res.data);
    //           setIsLoading(false);
    //           setIsAuthenticated(true);
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   });
  }, []);

  return (
    <>
      {!isLoading ? (
        <BrowserRouter>
          <Routes>
            {/* main */}
            <Route
              path="/"
              element={<Layout isAuthenticated={isAuthenticated} user={user} />}
            >
              {isAuthenticated && user.role !== "user" && (
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                </Route>
              )}
              {isAuthenticated && (
                <>
                  <Route
                    path="account"
                    element={
                      <MyAccount
                        isAuthenticated={isAuthenticated}
                        user={user}
                      />
                    }
                  />
                  <Route path="user" element={<User />}>
                    <Route
                      index
                      element={
                        <UserProfile
                          isAuthenticated={isAuthenticated}
                          user={user}
                        />
                      }
                    />
                    <Route path="orders" element={<Orders />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="addresses" element={<Addresses />} />
                    <Route path="help" element={<Help />} />
                  </Route>
                </>
              )}
              <Route
                index
                element={<Home isAuthenticated={isAuthenticated} user={user} />}
              />
              <Route
                path="cart"
                element={<Cart isAuthenticated={isAuthenticated} user={user} />}
              />
            </Route>

            {/* authentication */}
            {!isAuthenticated && (
              <Route path="/authentication" element={<Authentication />}>
                <Route index element={<Signing />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="flex h-[100vh] items-center justify-center border border-black">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#002663"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      )}
    </>
  );
}

export default App;
