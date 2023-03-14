import { dialogBoxPropsType } from "../../components/utils/DialogBox";
import { instance } from "../functions";

export const updatePersonalInformation = (
  e: React.FormEvent<HTMLFormElement>,
  username: string,
  profileImage: string,
  gender: string,
  x: number,
  y: number,
  width: number,
  height: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();

  setLoading(true);
  instance
    .put("/user/update-user", {
      username,
      profileImage,
      gender,
      x,
      y,
      width,
      height,
    })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        location.reload();
      }
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};

export const verifyEmailAddress = (
  email: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setNavigateSignal: React.Dispatch<React.SetStateAction<boolean>>,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>,
  setShowOtpResponse: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  instance
    .post("/user/verify-email", { email })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setNavigateSignal(true);
      }
    })
    .catch((error) => {
      setLoading(false);
      setShowOtpResponse(true);
      setResponse({ type: "error", message: error.response.data });
      console.log(error);
    });
};

export const updateEmailAddress = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  email: string,
  otp: string,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>,
  setShowOtpResponse: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  instance
    .put("/user/update-email", { email, otp })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        location.href = "http://localhost:3000/user";
      }
    })
    .catch((error) => {
      setLoading(false);
      setShowOtpResponse(true);
      setResponse({ type: "error", message: error.response.data });
      console.log(error);
    });
};
