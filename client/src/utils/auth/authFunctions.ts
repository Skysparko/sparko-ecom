import { instance } from "../functions";

import { dialogBoxPropsType } from "../../components/utils/DialogBox";
import { useDispatch } from "react-redux";
import store from "../../redux/store";
import { removeUserData } from "../../redux/userSlice";

interface registerFormTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//make a request to the server with username ,email and password
export const registration = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    username,
    email,
    password,
    confirmPassword,
    setResponse,
    setIsLoading,
  }: registerFormTypes
) => {
  e.preventDefault();

  // checking if the both passwords are same or not
  if (password !== confirmPassword) {
    setResponse({
      message: "The passwords do not match ",
      type: "warning",
    });
    return;
  }
  setIsLoading(true);
  instance
    .post("auth/register", { username, email, password })
    .then((res) => {
      if (res.status === 201) {
        setResponse({
          message: res.data,
          type: "success",
        });
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
      setResponse({
        message: err.response?.data,
        type: "error",
      });
      setIsLoading(false);
    });
};

interface loginFormTypes {
  email: string;
  password: string;
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
  rememberMe: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//accepts email and password with remember me option and make a request to the server to confirm the password
export const loggingIn = (
  e: React.FormEvent<HTMLFormElement>,
  { email, password, setResponse, rememberMe, setIsLoading }: loginFormTypes
) => {
  e.preventDefault();

  setIsLoading(true);
  instance
    .post("auth/login", {
      email,
      password,
      rememberMe,
    })
    .then((res) => {
      if (res.status === 200) {
        setResponse({
          type: "success",
          message: "Successfully logged in",
        });
        setIsLoading(false);

        location.href = "/";
      }
    })
    .catch((error) => {
      console.log(error.response?.data);
      setResponse({
        type: "error",
        message: error.response?.data,
      });
      setIsLoading(false);
    });
};

interface forgotPasswordTypes {
  email: string;
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//accepts email make a request to forgot password
export const forgotPassword = async (
  e: React.FormEvent<HTMLFormElement>,
  { email, setResponse, setIsLoading }: forgotPasswordTypes
) => {
  e.preventDefault();
  setIsLoading(true);
  instance
    .post("auth/forgot-password", { email })
    .then((res) => {
      if (res.status === 200) {
        setResponse({
          type: "success",
          message: "Email sent to the given email address",
        });
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
      setResponse({
        type: "error",
        message: err.response?.data,
      });
      setIsLoading(false);
    });
};

interface resetPasswordTypes {
  password: string;
  confirmPassword: string;
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
  token: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//reset password action
export const resetPassword = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    token,
    password,
    confirmPassword,
    setResponse,
    setIsLoading,
  }: resetPasswordTypes
) => {
  e.preventDefault();

  // checking if the both passwords are same or not
  if (password !== confirmPassword) {
    setResponse({
      message: "The passwords do not match ",
      type: "warning",
    });
    return;
  }
  setIsLoading(true);
  instance
    .put("auth/reset-password", { token, password })
    .then((res) => {
      if (res.status === 200) {
        setResponse({
          type: "success",
          message: "Your Password Successfully changed!",
        });
        setIsLoading(false);
        setTimeout(() => {
          location.href = "/authentication";
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
      setResponse({
        type: "error",
        message: err.response?.data,
      });
      setIsLoading(false);
    });
};

//for logging out
export const logout = () => {
  instance
    .get("auth/logout")
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(
          removeUserData({
            name: "",
            email: "",
            role: "",
            gender: "",
            id: "",
            pfp: "",
            isAuthenticated: false,
          })
        );
        location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};

//for verification of email address
const verifyEmail = (token: string) => {};
