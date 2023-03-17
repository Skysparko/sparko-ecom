import React, { useCallback, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { RiShoppingCartFill } from "react-icons/ri";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { updatePersonalInformation } from "../../../utils/user.functions";
import { ColorRing, TailSpin } from "react-loader-spinner";

export default function UserProfile() {
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
  const Output = async (
    croppedAreaPixels: Area,
    image: HTMLImageElement,
    croppedImage: string,
    setShowCropper: React.Dispatch<React.SetStateAction<boolean>>,
    setImageChanged: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    document.querySelector("#upload_file_image")?.classList.add("hidden");
    document.querySelector("#canvas")?.classList.remove("hidden");
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;

    const context = canvas.getContext("2d");
    context!.clearRect(0, 0, 150, 150);

    image.src = croppedImage;
    if (croppedAreaPixels) {
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

      setX(croppedAreaPixels.x);
      setY(croppedAreaPixels.y);
      setHeight(croppedAreaPixels.height);
      setWidth(croppedAreaPixels.width);

      setShowCropper(false);
    }
  };

  //loading state
  const [loading, setLoading] = useState(false);

  //extra States
  const [showEditEmail, setShowEditEmail] = useState(false);

  //cropping states
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(user.pfp);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);

  //coordinates and height for the cropped image
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  // form input states
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);

  const navigate = useNavigate();

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  let initialImage = new Image();

  useEffect(() => {
    const genders: NodeListOf<HTMLInputElement> =
      document.querySelectorAll("#gender input");

    genders.forEach((gender, index) => {
      if (gender.value === user.gender) {
        gender.checked = true;
      }
    });
    document.querySelector("#cropper")?.classList.remove("hidden");
    document.querySelector("#main")?.classList.add("hidden");
    const file = document.querySelector("#file")!;
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
  }, [showCropper]);

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
                setImageChanged
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
        <h1 className=" p-5 text-5xl font-semibold max-sm:text-4xl max-vs:text-3xl">
          Edit Your Profile
        </h1>
        <section className="m-10 mt-0 self-center ">
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
              className=" flex  cursor-pointer rounded-full"
            >
              <canvas
                id="canvas"
                width="150px"
                height="150px"
                className=" hidden rounded-full "
              ></canvas>

              <img
                src={user.pfp}
                alt="user email"
                id="upload_file_image"
                width="150px"
                height="150px"
                className="rounded-full object-contain shadow-xl"
              />

              <BsFillCameraFill
                size={35}
                className=" relative -ml-9 rounded-full bg-white p-1"
              />
            </label>
          </div>
        </section>
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) =>
            updatePersonalInformation(
              e,
              username,
              image,
              gender,
              x,
              y,
              width,
              height,
              setLoading
            )
          }
        >
          <h1 className="ml-5 text-4xl font-medium max-sm:text-3xl  max-vs:m-auto max-vs:text-2xl">
            Personal Information
          </h1>
          <div className="ml-32  flex flex-col gap-10 max-sm:ml-20 max-vs:m-auto max-vs:justify-center ">
            <span className=" max-vs:flex max-vs:flex-col max-vs:justify-center">
              <label
                htmlFor="user_profile_username"
                className="mr-5 max-vs:m-auto"
              >
                Enter Your Username Here:-
              </label>
              <input
                type="text"
                id="user_profile_username"
                value={username}
                placeholder="Username"
                className=" rounded-md border border-gray-500 p-2 shadow-inner"
                onChange={(e) => setUsername(e.target.value)}
              />
            </span>

            <span
              id="gender"
              className="flex gap-5 max-sm:flex-col max-vs:m-auto"
            >
              <label htmlFor="user_profile_male" className="mr-5 max-vs:m-auto">
                Please select your gender:-
              </label>
              <span className="flex gap-2" onClick={() => setGender("male")}>
                <input
                  type="radio"
                  id="user_profile_male"
                  name="gender"
                  value="male"
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />
                <label htmlFor="user_profile_male">Male</label>
              </span>
              <span className="flex gap-2" onClick={() => setGender("female")}>
                <input
                  type="radio"
                  id="user_profile_female"
                  name="gender"
                  value="female"
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />
                <label htmlFor="user_profile_female">Female</label>
              </span>

              <span className="flex gap-2" onClick={() => setGender("unknown")}>
                <input
                  type="radio"
                  id="user_profile_not"
                  name="gender"
                  value="unknown"
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />
                <label htmlFor="user_profile_not">Prefer not to say</label>
              </span>
            </span>
          </div>
          <button
            type="submit"
            className="m-5 flex w-40 justify-center rounded border border-black bg-sky-700 py-2 text-white shadow-md"
          >
            {loading ? (
              <TailSpin
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <>Save changes</>
            )}
          </button>
        </form>

        <form>
          <h1 className="my-5 ml-5 text-4xl font-medium max-sm:text-3xl max-vs:ml-0 max-vs:text-center  max-vs:text-2xl">
            Login and Security
          </h1>

          <div className="ml-32 mb-10 flex flex-col gap-10 max-sm:ml-20 max-vs:m-auto max-vs:justify-center">
            <span className="flex flex-wrap items-center max-vs:justify-center ">
              <label htmlFor="user_profile_email" className="mr-5">
                Email address :-
              </label>
              <span className="flex flex-wrap gap-3">
                <input
                  type="email"
                  id="user_profile_email"
                  value={email}
                  placeholder="Email address"
                  readOnly
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />

                <button
                  className=" cursor-pointer rounded-md border border-gray-500 bg-sky-600 px-5 text-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("login-security/edit-email");
                  }}
                >
                  Edit
                </button>
              </span>
            </span>
            <span className="flex flex-wrap items-center max-vs:justify-center ">
              <label htmlFor="user_profile_email" className="mr-5">
                Password :-
              </label>
              <span className="flex flex-wrap gap-3">
                <input
                  type="password"
                  id="user_profile_password"
                  value="********"
                  readOnly
                  className="rounded-md border border-gray-500 p-2 shadow-inner"
                />

                <button
                  className=" cursor-pointer rounded-md border border-gray-500 bg-sky-600 px-5 text-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("login-security/edit-password");
                  }}
                >
                  Edit
                </button>
              </span>
            </span>
          </div>
        </form>
      </div>
    </article>
  );
}
