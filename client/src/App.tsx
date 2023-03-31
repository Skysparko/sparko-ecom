import {
  Route,
  BrowserRouter,
  Routes,
  useNavigation,
  useNavigate,
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
import UserProfile from "./pages/user/user_profile/UserProfile";
import Orders from "./pages/user/Orders";
import Addresses from "./pages/user/manage_addresses/Addresses";
import Payment from "./pages/user/Payment";
import MyAccount from "./pages/MyAccount";
import Help from "./pages/user/Help";
import { BallTriangle } from "react-loader-spinner";
import Overview from "./pages/dashboard/Overview";
import Dashboard from "./components/dashboard/Dashboard";
import Products from "./pages/dashboard/products/Products";
import Transactions from "./pages/dashboard/Transactions";
import Shipments from "./pages/dashboard/Shipments";
import Reports from "./pages/dashboard/Reports";
import Customers from "./pages/dashboard/Customers";
import Orders_Dashboard from "./pages/dashboard/Orders";
import Verification from "./pages/auth/Verification";
import { useSelector, useDispatch } from "react-redux";
import { addUserData } from "./redux/user.slice";
import EditEmail from "./pages/user/user_profile/EditEmail";
import LoginSecurity from "./components/user/user_profile/LoginSecurity";
import EditPassword from "./pages/user/user_profile/EditPassword";
import AddAddress from "./pages/user/manage_addresses/AddAddress";
import EditAddress from "./pages/user/manage_addresses/EditAddress";
import { authenticateUser } from "./utils/auth.functions";
import AddProduct from "./pages/dashboard/products/AddProduct";
import EditProduct from "./pages/dashboard/products/EditProduct";

function App() {
  const dispatch = useDispatch();
  //loading state
  const [isLoading, setIsLoading] = useState(true);
  //getting user's info using redux store
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
  useEffect(() => {
    //authenticating user on every component mounting
    authenticateUser(setIsLoading, dispatch);
  }, [dispatch]);

  return (
    <>
      {!isLoading ? (
        <BrowserRouter>
          <Routes>
            {/* Dashboard section,
             access: any authorized role but not user
              */}
            <Route path="/" element={<Layout />}>
              {user.isAuthenticated && user.role !== "user" && (
                <Route path="dashboard" element={<Dashboard />}>
                  <Route index element={<Overview />} />
                  <Route path="orders" element={<Orders_Dashboard />} />
                  <Route path="products">
                    <Route index element={<Products />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="edit-product" element={<EditProduct />} />
                  </Route>
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="shipments" element={<Shipments />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="customers" element={<Customers />} />
                </Route>
              )}
              {/* User section,
             access: authorized user 
              */}
              {user.isAuthenticated && (
                <>
                  <Route path="account" element={<MyAccount />} />
                  <Route path="user" element={<User />}>
                    <Route index element={<UserProfile />} />
                    <Route path="login-security" element={<LoginSecurity />}>
                      <Route path="edit-email" element={<EditEmail />} />
                      <Route path="edit-password" element={<EditPassword />} />
                    </Route>

                    <Route path="orders" element={<Orders />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="addresses">
                      <Route index element={<Addresses />} />
                      <Route path="add-address" element={<AddAddress />} />
                      <Route path="edit-address" element={<EditAddress />} />
                    </Route>
                    <Route path="help" element={<Help />} />
                  </Route>
                </>
              )}
              {/* Home section,
             access: anyone 
              */}
              <Route index element={<Home />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* authentication 
              access: anyone
            */}
            {!user.isAuthenticated && (
              <Route path="/authentication" element={<Authentication />}>
                <Route index element={<Signing />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="Verification" element={<Verification />} />
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
