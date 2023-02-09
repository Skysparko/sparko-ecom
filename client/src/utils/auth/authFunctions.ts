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
}

export const authentication = (
  e: React.FormEvent<HTMLFormElement>,
  { email, password }: loginFormTypes
) => {
  e.preventDefault();

  instance
    .post("user/login", {
      email,
      password,
    })
    .then((res) => {
      if (res.status === 200) {
        alert("Login successful");
      }
    })
    .catch((error) => {
      console.log(error.response?.data);
    });
};
