import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Authentication from "./pages/Authentication";
import Cart from "./pages/Cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="/authentication" element={<Authentication />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
