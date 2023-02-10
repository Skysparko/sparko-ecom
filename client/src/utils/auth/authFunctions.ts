import { instance } from "../functions";

import { dialogBoxPropsType } from "../../components/DialogBox";

interface registerFormTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
}

//a lot of work is left to implement
export const registration = async (
  e: React.FormEvent<HTMLFormElement>,
  { username, email, password, confirmPassword, setResponse }: registerFormTypes
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
  instance
    .post("user/register", { username, email, password })
    .then((res) => {
      if (res.status === 201) {
        setResponse({
          message: "Successfully registered",
          type: "success",
        });
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
      setResponse({
        message: err.response?.data,
        type: "error",
      });
    });
};

interface loginFormTypes {
  email: string;
  password: string;
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
  rememberMe: boolean;
}

export const loggingIn = (
  e: React.FormEvent<HTMLFormElement>,
  { email, password, setResponse, rememberMe }: loginFormTypes
) => {
  e.preventDefault();
  console.log(rememberMe);
  instance
    .post("user/login", {
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
        location.href = "/";
      }
    })
    .catch((error) => {
      console.log(error.response?.data);
      setResponse({
        type: "error",
        message: error.response?.data,
      });
    });
};

interface forgotPasswordTypes {
  email: string;
}

//a lot of work is left to implement
export const forgotPassword = async (
  e: React.FormEvent<HTMLFormElement>,
  { email }: forgotPasswordTypes
) => {
  e.preventDefault();

  instance
    .post("user/forgot-password", { email })
    .then((res) => {
      if (res.status === 200) {
        console.log("");
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};
