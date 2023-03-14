import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  updateEmailAddress,
  verifyEmailAddress,
} from "../../../utils/user/user.functions";
import OTPInput, { ResendOTP } from "otp-input-react";
import { TailSpin } from "react-loader-spinner";
import DialogBox, {
  dialogBoxPropsType,
} from "../../../components/utils/DialogBox";
import { useSelector } from "react-redux";

const renderTime = (time: number) => {
  return (
    <span id="resend_timer">
      <DialogBox type="info" message={`${time} seconds remaining`} />
    </span>
  );
};

const renderButton = (buttonProps: Array<string>) => {
  return (
    <button
      id="resend_button"
      {...buttonProps}
      className="mb-3 w-28 font-medium text-blue-600 opacity-60"
    >
      Resend code
    </button>
  );
};

export default function EditEmail() {
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showOtpResponse, setShowOtpResponse] = useState(false);
  const [response, setResponse] = useState<dialogBoxPropsType>({
    type: "info",
    message: "",
  });
  const [showResponse, setShowResponse] = useState(false);
  const [OTP, setOTP] = useState("");

  return (
    <div className="max-xs:xs  flex  flex-col justify-center p-24 max-md:px-10 max-sm:py-10 max-sm:text-sm max-vs:px-5 max-xs:px-2 ">
      {!showOtp ? (
        <form
          id="edit-email-form"
          className="m-auto flex w-[30rem] flex-col gap-5  max-sm:w-[95%]"
          onSubmit={(e) => {
            e.preventDefault();
            if (email === user.email) {
              setShowResponse(true);
              setResponse({
                type: "error",
                message:
                  "You cannot use the email address you have entered, because it is the same as your current email address.",
              });
            } else {
              verifyEmailAddress(
                email,
                setLoading,
                setShowOtp,
                setResponse,
                setShowOtpResponse
              );
            }
          }}
        >
          <h1 className="text-center text-3xl font-semibold max-sm:text-2xl max-xs:text-xl">
            Change your email address
          </h1>

          <span>
            <p>Current email address:</p>
            <p>shubhamrakhecha5@gmail.com</p>
          </span>
          <p>
            Enter the new email address you would like to associate with your
            account below. We will send a One Time Password (OTP) to that
            address.
          </p>
          {showResponse && (
            <DialogBox type={response.type} message={response.message} />
          )}
          <span className="flex flex-col">
            <label htmlFor="new_email_address">New email address:</label>
            <input
              type="email"
              id="new_email_address"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-gray-400 p-2 shadow-inner"
            />
          </span>
          <button className="flex justify-center rounded-md bg-sky-700 py-2 px-5 text-white">
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
              <>Continue</>
            )}
          </button>
        </form>
      ) : (
        <div className=" m-auto flex flex-col justify-center">
          <span className="flex flex-col gap-2 ">
            <h1 className="text-2xl font-semibold max-md:text-xl">
              Enter verification code
            </h1>
            <h3 className="max-md:text-sm">
              For your security, we have sent the code to your email {email[0]}
              *******@
              {email.split("@")[1]}.
            </h3>
          </span>
          <span className="my-5 flex justify-center">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              style={{}}
              // inputStyles={{
              //   height: "40px",
              //   margin: "0px 10px",
              //   display: "flex",
              //   "@media screen and (maxWidth:350px)": {
              //     margin: "0px 5px",
              //   },
              // }}
              inputClassName="!flex !h-12  !rounded border-2 font-semibold border-gray-800 text-xl  !m-1 "
              className="m-auto "
            />
          </span>

          <span className="max flex flex-col gap-5 max-md:text-sm">
            <ResendOTP
              onResendClick={() => {
                verifyEmailAddress(
                  email,
                  setLoading,
                  setShowOtp,
                  setResponse,
                  setShowOtpResponse
                );
              }}
              onTimerComplete={() => {
                const resendButton = document.querySelector("#resend_button");
                const resendTimer = document.querySelector("#resend_timer");
                resendButton?.classList.remove("opacity-60");
                resendTimer?.classList.add("hidden");
              }}
              renderTime={renderTime}
              renderButton={renderButton}
              style={{
                display: "flex",
                flexDirection: "column-reverse",
              }}
            />
            {showOtpResponse && (
              <DialogBox type={response.type} message={response.message} />
            )}
            <button
              className="m-auto flex justify-center rounded-md bg-sky-700 py-2 px-5 text-white"
              onClick={(e) => {
                e.preventDefault();

                updateEmailAddress(
                  setLoading,
                  email,
                  OTP,
                  setResponse,
                  setShowOtpResponse
                );
              }}
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
                <>Submit</>
              )}
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
