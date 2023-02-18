import React, { useCallback, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { RiShoppingCartFill } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { useRef } from "react";

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

const Output = async (
  croppedAreaPixels: Area,
  image: HTMLImageElement,
  croppedImage: string,
  setShowCropper: React.Dispatch<React.SetStateAction<boolean>>,
  setHideInitialImage: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setHideInitialImage(true);
  const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;

  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, 200, 200);

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
      200,
      200
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
export default function UserProfile({ isAuthenticated, user }: PropTypes) {
  console.log("component render");
  // const imageRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(user.pfp);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [hideInitialImage, setHideInitialImage] = useState(false);

  // const [croppedImage, setCroppedImage] = useState<unknown>();

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  // const img: HTMLImageElement = document.querySelector("#upload_file_image")!;

  let initialImage = new Image();
  useEffect(() => {
    const file = document.querySelector("#file")!;
    window.addEventListener("loadstart", () => {
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
        200,
        200
      );
    });
    document.querySelector("#cropper")?.classList.remove("hidden");
    document.querySelector("#main")?.classList.add("hidden");
    file.addEventListener("change", function (e) {
      //this refers to file
      const chooseFile = (e.currentTarget as HTMLInputElement).files![0];

      if (chooseFile) {
        const reader = new FileReader(); //FileReader is a predefined function of JS
        reader.addEventListener("loadend", () => {
          console.log("loading ended");
        });
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

  return (
    <article className="flex">
      <section
        className="flex h-[89.5vh] w-full flex-col items-center justify-center border border-yellow-700 bg-gray-400"
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
        <span>
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
          >
            crop it
          </button>
          <button onClick={() => setShowCropper(false)} className=" border">
            cancel
          </button>
        </span>
      </section>
      <div className="flex border border-black">
        <section className="mx-10 border border-black" id="main">
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
                  width="200px"
                  height="200px"
                  className="rounded-full"
                ></canvas>
              ) : (
                <img
                  src={user.pfp}
                  alt="user email"
                  id="upload_file_image"
                  width="200px"
                  height="200px"
                  className="rounded-full border  border-black object-contain"
                />
              )}
              <BsFillCameraFill
                size={35}
                className=" absolute ml-36 rounded-full bg-white p-1"
              />
            </label>
          </div>
          <span>
            <h2>{user.name}</h2>
          </span>
        </section>
      </div>
      <form>
        <h1>personal Information</h1>
        <input type="text" value={user.name} />
        <input type="email" value={user.email} />
      </form>
    </article>
  );
}
