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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  // useEffect(() => {
  window.addEventListener("load", () => {
    instance
      .post("user/authenticate")
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  // });

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
          <Route path="/authentication" element={<Authentication />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
