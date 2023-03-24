import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { productType, getAllProducts } from "../../../redux/product.slice";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //getting user from redux store
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
        address: string;
      };
    }) => state.user
  );
  // getting addresses from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};
  useEffect(() => {
    // dispatching all the addresses from server to the redux store
    dispatch(getAllProducts());
  }, []);

  return (
    <article className="bg-gray-100 p-5">
      <header className="flex justify-between ">
        <h1 className="text-4xl font-semibold">Products</h1>
        <button
          className="flex items-center justify-center gap-2 rounded bg-sky-700 p-1 pl-2 pr-3 text-white shadow-lg"
          onClick={() => navigate("add-product")}
        >
          <AiOutlinePlus /> Create new
        </button>
      </header>
      <main className="mt-5  rounded-lg bg-white">
        <div className="flex justify-between p-5 ">
          <input
            type="search"
            name="product_dashboard_search"
            id="product_dashboard_search"
            className="rounded border border-gray-500 p-2 shadow-md"
            placeholder="Search products here"
          />
          <span className="flex gap-5 text-center">
            <select
              name="status"
              id="status"
              className="rounded border border-gray-400 bg-white p-2 text-center shadow-md"
            >
              <option value="All">All</option>
              <option value="Active">Public</option>
              <option value="Archived">Private</option>
            </select>

            {/* <label htmlFor="show">Show</label> */}
            <select
              name="show"
              id="show"
              className="rounded border border-gray-400 bg-white p-2 text-center shadow-md"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            {/* <label htmlFor="sort"> Date</label> */}
            <select
              name="sort"
              id="sort"
              className="rounded border border-gray-400 bg-white p-2 text-center shadow-md"
            >
              <option value="today">today</option>
              <option value="week">week</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </select>
          </span>
        </div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>S.No.</th>
              <th className="w-[35rem]">Product</th>

              <th>Price</th>
              <th>Offer</th>

              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => (
              <tr key={i} className="hover:bg-slate-200 ">
                <td>{i + 1}</td>
                <td className="flex  gap-5 p-2">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="  h-20 w-20 rounded object-contain shadow"
                  />
                  <span className="flex flex-col gap-2 text-left">
                    <h1 className="line-clamp-1">{item.title}</h1>
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {item.description}
                    </p>
                  </span>
                </td>
                {/* <td className="p-2">{item.title}</td> */}
                <td className="p-2">{item.price.toString()}</td>
                <td className="p-2">
                  {item.offer > 0 ? item.offer : "No offer"}
                </td>

                <td className="p-2">{item.stock}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </article>
  );
}
