import { instance } from "../functions";

import { dialogBoxPropsType } from "../../components/utils/DialogBox";

interface registerFormTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
}

//make a request to the server with username ,email and password
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

//accepts email and password with remember me option and make a request to the server to confirm the password
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
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
}

//accepts email make a request to forgot password
export const forgotPassword = async (
  e: React.FormEvent<HTMLFormElement>,
  { email, setResponse }: forgotPasswordTypes
) => {
  e.preventDefault();

  instance
    .post("user/forgot-password", { email })
    .then((res) => {
      if (res.status === 200) {
        setResponse({
          type: "success",
          message: "Email sent to the given email address",
        });
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
      setResponse({
        type: "error",
        message: err.response?.data,
      });
    });
};

interface resetPasswordTypes {
  password: string;
  confirmPassword: string;
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>;
  token: string;
}

//reset password action
export const resetPassword = async (
  e: React.FormEvent<HTMLFormElement>,
  { token, password, confirmPassword, setResponse }: resetPasswordTypes
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
    .put("user/reset-password", { token, password })
    .then((res) => {
      if (res.status === 200) {
        setResponse({
          type: "success",
          message: "Your Password Successfully changed!",
        });
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
    });
};

//for logging out
export const logout = () => {
  instance
    .get("user/logout")
    .then((res) => {
      if (res.status === 200) {
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};
