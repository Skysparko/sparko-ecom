import React, { useCallback, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { RiShoppingCartFill } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { useRef } from "react";
import { validateEmail } from "../../../../server/src/utils/validators";

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

// const Output = ({ croppedArea }) => {
//   return (
//     <div className="output" style={{ paddingBottom: `${100 / (4 / 3)}%` }}>
//       <img src="/assets/dog.jpeg" alt="" style={imageStyle} />
//     </div>
//   );
// };

//!there is a error here because crop work after two click initially and can't find the canvas on load

export default function UserProfile({ isAuthenticated, user }: PropTypes) {
  const Output = async (
    croppedAreaPixels: Area,
    image: HTMLImageElement,
    croppedImage: string,
    setShowCropper: React.Dispatch<React.SetStateAction<boolean>>,
    setHideInitialImage: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setHideInitialImage(true);
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;

    const context = canvas.getContext("2d");
    context!.clearRect(0, 0, 150, 150);

    image.src = croppedImage;
    if (croppedAreaPixels) {
      // const scale = 100 / croppedAreaPixels.width;
      // const transform = {
      //   x: `${-croppedAreaPixels.x * scale}%`,
      //   y: `${-croppedAreaPixels.y * scale}%`,
      //   scale,
      //   width: "calc(100% + 0.5px)",
      //   height: "auto",
      // };

      // const imageStyle = {
      //   transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
      //   width: transform.width,
      //   height: transform.height,
      // };
      context!.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.height,
        croppedAreaPixels.width,
        0,
        0,
        150,
        150
      );
      // img.setAttribute("src", image);
      // img.style.transform = imageStyle.transform;
      // const result = new Promise((resolve, reject) => {
      //   canvas.toBlob((file) => {
      //     resolve(URL.createObjectURL(file!));
      //   }, "image/jpeg");
      // });
      // const resultImage = await result;
      // setCroppedImage(resultImage);
      setShowCropper(false);
    }
  };

  //cropping states
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(user.pfp);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [hideInitialImage, setHideInitialImage] = useState(false);

  // form input states
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState("no");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  // const img: HTMLImageElement = document.querySelector("#upload_file_image")!;

  let initialImage = new Image();
  useEffect(() => {
    if (email !== user.email) {
      document.getElementById("emailVerifyButton")?.classList.remove("hidden");
    } else {
      document.getElementById("emailVerifyButton")?.classList.add("hidden");
    }
    const file = document.querySelector("#file")!;
    window.addEventListener("load", () => {
      const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
      const context = canvas.getContext("2d")!;
      initialImage.src = `${user.pfp}`;
      context.drawImage(
        initialImage,
        0,
        0,
        initialImage.height,
        initialImage.width,
        0,
        0,
        150,
        150
      );
    });
    document.querySelector("#cropper")?.classList.remove("hidden");
    document.querySelector("#main")?.classList.add("hidden");
    file.addEventListener("change", function (e) {
      //this refers to file
      const chooseFile = (e.currentTarget as HTMLInputElement).files![0];

      if (chooseFile) {
        const reader = new FileReader(); //FileReader is a predefined function of JS
        // reader.onloadstart = function () {
        //   console.log("loading started");
        // };
        reader.addEventListener("load", function () {
          setImage(`${reader.result}`);
        });

        reader.readAsDataURL(chooseFile);
      }
    });
    if (!showCropper) {
      document.querySelector("#cropper")?.classList.add("hidden");
      document.querySelector("#main")?.classList.remove("hidden");
    }
  });

  function verify(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    alert("please check your email address");
  }

  return (
    <article className="flex">
      <section
        className="flex h-[95vh] w-full flex-col items-center justify-center border border-yellow-700 bg-gray-400"
        id="cropper"
      >
        <div className="relative h-[70%] w-[70%]">
          <Cropper
            image={image}
            crop={crop}
            // rotation={rotation}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            // onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <span className="mt-10 flex gap-28">
          <button
            onClick={() =>
              Output(
                croppedAreaPixels!,
                initialImage,
                image,
                setShowCropper,
                setHideInitialImage
              )
            }
            className="rounded border  bg-blue-500 py-3 px-6 text-white shadow-md"
          >
            Crop
          </button>
          <button
            onClick={() => setShowCropper(false)}
            className="rounded border bg-red-500 py-3 px-6 text-white shadow-md"
          >
            Cancel
          </button>
        </span>
      </section>
      <div
        className="flex  w-full flex-col justify-center border border-black bg-gray-100"
        id="main"
      >
        <h1 className="mb-5 mt-5 text-center text-5xl underline underline-offset-8">
          Edit Your Profile
        </h1>
        <section className="m-10 self-center ">
          <div>
            <input
              type="file"
              name="user_image"
              id="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={() => setShowCropper(true)}
            />
            <label
              htmlFor="file"
              id="upload_file_btn"
              className=" flex  rounded-full"
            >
              {hideInitialImage ? (
                <canvas
                  id="canvas"
                  width="150px"
                  height="150px"
                  className="rounded-full"
                ></canvas>
              ) : (
                <img
                  src={user.pfp}
                  alt="user email"
                  id="upload_file_image"
                  width="150px"
                  height="150px"
                  className="rounded-full border  border-black object-contain"
                />
              )}
              <BsFillCameraFill
                size={35}
                className=" relative -ml-9 rounded-full bg-white p-1"
              />
            </label>
          </div>
        </section>
        <form className="flex flex-col gap-6">
          <h1 className="ml-5 text-4xl underline-offset-1">
            Personal Information
          </h1>
          <div className="ml-32  flex flex-col gap-10 max-vs:ml-10 max-xs:m-5 ">
            <span>
              <label htmlFor="user_profile_username" className="mr-5">
                Enter Your Username Here:-
              </label>
              <input
                type="text"
                id="user_profile_username"
                value={username}
                placeholder="Username"
                className="rounded-md border border-gray-500 p-2 shadow-inner"
                onChange={(e) => setUsername(e.target.value)}
              />
            </span>
            <span className="flex flex-wrap items-center">
              <label htmlFor="user_profile_email" className="mr-5">
                Enter Your Email address Here:-
              </label>
              <span className="flex flex-wrap gap-3">
                <input
                  type="email"
                  id="user_profile_email"
                  value={email}
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />

                <button
                  className=" hidden cursor-pointer rounded-md border border-gray-500 bg-sky-600 px-5 text-white shadow-sm"
                  id="emailVerifyButton"
                  onClick={(e) => {
                    verify(e);
                  }}
                >
                  Verify
                </button>
              </span>
            </span>
            <span>
              <label htmlFor="user_profile_phone" className="mr-5">
                Enter Your Phone No. Here:-
              </label>
              <input
                type="tel"
                placeholder="Phone no."
                id="user_profile_phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-md border border-gray-500 p-2 shadow-inner"
              />
            </span>

            <span className="flex gap-5 max-sm:flex-col">
              <label htmlFor="user_profile_male" className="mr-5">
                Please select your gender:-
              </label>
              <span className="flex gap-2">
                <input
                  type="radio"
                  id="user_profile_male"
                  name="gender"
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />
                <label htmlFor="user_profile_male">Male</label>
              </span>
              <span className="flex gap-2">
                <input
                  type="radio"
                  id="user_profile_female"
                  name="gender"
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />
                <label htmlFor="user_profile_female">Female</label>
              </span>

              <span className="flex gap-2">
                <input
                  type="radio"
                  id="user_profile_not"
                  name="gender"
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />
                <label htmlFor="user_profile_not">Prefer not to say</label>
              </span>
            </span>
          </div>
          <button
            type="submit"
            className="m-5 w-40 rounded border border-black bg-sky-700 py-2 text-white shadow-md"
          >
            Save changes
          </button>
          <h1 className="my-5 ml-5 text-4xl">Login and Security</h1>
          <div className="ml-32 flex flex-col gap-5 max-vs:ml-10 max-xs:m-5 ">
            <h3 className="text-2xl ">Want to change your Password?</h3>
            <span>
              <label htmlFor="user_profile_current_password" className="mr-5">
                Current Password:-
              </label>
              <input
                type="password"
                placeholder="Current Password"
                id="user_profile_current_password"
                className="rounded-md border border-gray-500 p-2 shadow-inner"
              />
            </span>
            <span>
              <label htmlFor="user_profile_new_password" className="mr-5">
                New Password:-
              </label>
              <input
                type="password"
                placeholder="Current Password"
                id="user_profile_new_password"
                className="rounded-md border border-gray-500 p-2 shadow-inner"
              />
            </span>
            <span>
              <label
                htmlFor="user_profile_confirm_new_password"
                className="mr-5"
              >
                Confirm New Password:-
              </label>
              <input
                type="password"
                placeholder="Current Password"
                id="user_profile_confirm_new_password"
                className="rounded-md border border-gray-500 p-2 shadow-inner"
              />
            </span>
          </div>

          <button
            type="submit"
            className="m-5 w-40 rounded border border-black bg-sky-700 py-2 text-white shadow-md"
          >
            Save changes
          </button>
        </form>
      </div>
    </article>
  );
}
