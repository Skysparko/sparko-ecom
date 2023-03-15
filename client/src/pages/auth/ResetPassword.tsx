import React, { useState } from "react";
import { instance, passwordViewToggler } from "../../utils/functions";
import { useEffect } from "react";
import { FiKey } from "react-icons/fi";
import DialogBox, {
  dialogBoxPropsType,
} from "../../components/utils/DialogBox";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { resetPassword } from "../../utils/authFunctions";
import { TailSpin } from "react-loader-spinner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [response, setResponse] = useState<dialogBoxPropsType>({
    type: "info",
    message: "Please enter your registered email here ! ",
  });
  const token = new URLSearchParams(window.location.search).get("token")!;
  useEffect(() => {
    instance
      .put("user/verify-reset-token", { token })
      .then((res) => {
        if (res.status === 200) {
          setIsTokenValid(true);
        }
      })
      .catch((err) => {
        console.log(err.data);
      });
  });

  return (
    <>
      {isTokenValid ? (
        <>
          {/* <span className="flex rounded-full bg-sky-100 p-3 ">
            <FiKey
              className="rounded-full bg-sky-200 p-3 text-5xl"
              color="#032e73"
            />
          </span> */}
          <span className="mt-7 mb-5 flex flex-col justify-center gap-5 p-2 text-center max-xs:mb-3 max-xs:mt-5 max-xs:w-[90%]">
            <h1 className=" text-4xl max-xs:text-3xl">Create new password</h1>
            {/* <h2 className="text-gray-700 max-xs:text-[0.9rem]">
              No worries, we'll send you reset instructions.
            </h2> */}
          </span>
          <form
            method="post"
            className="flex flex-col gap-3 p-2 max-xs:w-[90%] max-xs:text-[0.95rem] max-vxs:text-[0.8rem]"
            onSubmit={(e) =>
              resetPassword(e, {
                password,
                confirmPassword,
                setResponse,
                token,
                setIsLoading,
              })
            }
          >
            <DialogBox message={response.message} type={response.type} />
            {/* Password Bar */}
            <span className="flex">
              {/* Password Input Bar */}
              <input
                type="password"
                name="password"
                placeholder="New password"
                id="reset_password"
                className="w-full rounded border-2 border-gray-600 p-2 px-2 pr-10
          shadow-inner outline-blue-600 max-vs:text-sm max-vxs:text-xs"
                required
                minLength={8}
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Password View Toggle Button */}
              <span
                className="-ml-8 mt-3 cursor-pointer text-xl max-vs:mt-[0.7rem] max-vs:text-lg max-vxs:mt-[0.6rem] max-vxs:-ml-7 max-vxs:text-base"
                id="password_show_toggler"
              >
                {/* Toggle password show or hide */}
                {showPassword ? (
                  <BsEye
                    onClick={() =>
                      passwordViewToggler(
                        showPassword,
                        setShowPassword,
                        "#reset_password"
                      )
                    }
                  />
                ) : (
                  <BsEyeSlash
                    onClick={() =>
                      passwordViewToggler(
                        showPassword,
                        setShowPassword,
                        "#reset_password"
                      )
                    }
                  />
                )}
              </span>
            </span>
            {/* Password Bar */}
            <span className="flex">
              {/* Password Input Bar */}
              <input
                type="password"
                name="confirmPassword"
                placeholder="New confirm password"
                id="confirm_reset_password"
                className="w-full rounded border-2 border-gray-600 p-2 px-2 pr-10 shadow-inner
          outline-blue-600 max-vs:w-[100%] max-vs:text-sm max-vxs:text-xs"
                required
                minLength={8}
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* Password View Toggle Button */}
              <span
                className="-ml-8 mt-3 cursor-pointer text-xl max-vs:mt-[0.7rem] max-vs:text-lg max-vxs:mt-[0.6rem] max-vxs:-ml-7 max-vxs:text-base"
                id="password_show_toggler"
              >
                {/* Toggle password show or hide */}
                {showConfirmPassword ? (
                  <BsEye
                    onClick={() =>
                      passwordViewToggler(
                        showConfirmPassword,
                        setShowConfirmPassword,
                        "#confirm_reset_password"
                      )
                    }
                  />
                ) : (
                  <BsEyeSlash
                    onClick={() =>
                      passwordViewToggler(
                        showConfirmPassword,
                        setShowConfirmPassword,
                        "#confirm_reset_password"
                      )
                    }
                  />
                )}
              </span>
            </span>

            <button className="rounded bg-sky-700 p-2 text-white  ">
              {isLoading ? (
                <h1 className=" flex justify-center">
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
                </h1>
              ) : (
                <h1>Submit</h1>
              )}
            </button>
          </form>
        </>
      ) : (
        <div>Invalid Token</div>
      )}
    </>
  );
}
