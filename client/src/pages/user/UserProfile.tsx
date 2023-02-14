import React from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { RiShoppingCartFill } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

interface PropTypes {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
    pfp: string;
  };
}

export default function UserProfile({ isAuthenticated, user }: PropTypes) {
  useEffect(() => {
    const file = document.querySelector("#file")!;
    const img = document.querySelector("#upload_file_image")!;

    file.addEventListener("change", function (e) {
      //this refers to file
      const chooseFile = (e.currentTarget as HTMLInputElement).files![0];

      if (chooseFile) {
        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener("load", function () {
          img.setAttribute("src", `${reader.result}`);
        });

        reader.readAsDataURL(chooseFile);
      }
    });
  });

  return (
    <article>
      <div className="flex border border-black">
        <span className="mx-10 border border-black">
          <input
            type="file"
            name="user_image"
            id="file"
            className="hidden"
            accept="image/png, image/jpeg"
          />
          <label
            htmlFor="file"
            id="upload_file_btn"
            className="flex w-32 rounded-full border border-black "
          >
            <img
              src={user.pfp}
              alt="user email"
              id="upload_file_image"
              className="w-32 rounded-full"
            />
            <BsFillCameraFill
              size={35}
              className=" absolute ml-24 rounded-full bg-white p-1"
            />
          </label>
        </span>
        <span>
          <h2>{user.name}</h2>
        </span>
      </div>
      <form></form>
    </article>
  );
}
