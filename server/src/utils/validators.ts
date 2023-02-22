import axios from "axios";

//* Validates user's name. Rules: Name must be at least 3 character long and must not include numbers or special characters
export const validateName = (name: string) => {
  const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/);
  return nameRegex.test(name); //* checks whether the entered name matches the specified condition and returns true or false accordingly
};

//* Validates user's email.
export const validateEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.VALIDATION_API_KEY}&email=${email}`
    );

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }

  //* checks whether the entered email is valid or not and returns true or false accordingly
};

//* Validates user's Phone Number.
export const validatePhone = (phone: string) => {
  let result;
  axios
    .get(
      `https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.VALIDATION_API_KEY}&phone=${phone}`
    )
    .then((response) => {
      if (response.status === 200) {
        result = true;
      }
    })
    .catch((error) => {
      result = false;
    });
  return result;
  //* checks whether the entered phone number is  valid or not and returns true or false accordingly
};

//* Validates user's password. Rules: Password must be at least 8 character long and it must include at least - one uppercase letter, one lowercase letter, one digit, one special character
export const validatePassword = (password: string) => {
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  return passwordRegex.test(password); //* checks whether the entered password matches the specified condition and returns true or false accordingly
};
