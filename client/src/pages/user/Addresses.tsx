import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Addresses() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <h1 className="mb-5 mt-5 ml-5 text-5xl">Manage Addresses</h1>
      <section className=" p-10">
        <div
          className="h-52 w-52 cursor-pointer border-2 border-dashed border-black p-5"
          onClick={() => setShowForm(!showForm)}
        >
          <span className="flex h-full flex-col items-center justify-center  ">
            <span className="flex flex-col gap-5">
              <AiOutlinePlus className=" m-auto  rounded-full border-2 border-dashed border-black p-1 text-5xl  " />
              <h2 className="text-center font-medium">
                Add <br />
                Addresses
              </h2>
            </span>
          </span>
        </div>
      </section>
      {showForm && (
        <section>
          <h1 className="m-5 text-3xl font-semibold">Add a new address</h1>
          <form>
            <select name="country" id="country"></select>
          </form>
        </section>
      )}
    </div>
  );
}
