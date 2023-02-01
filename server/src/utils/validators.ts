//* Validates user's name. Rules: Name must be at least 3 character long and must not include numbers or special characters
export const validateName = (name: string) => {
  const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/);
  return nameRegex.test(name); //* checks whether the entered name matches the specified condition and returns true or false accordingly
};

//* Validates user's email.
export const validateEmail = (email: string) => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return emailRegex.test(email); //* checks whether the entered email matches the specified condition and returns true or false accordingly
};

//* Validates user's password. Rules: Password must be at least 8 character long and it must include at least - one uppercase letter, one lowercase letter, one digit, one special character
export const validatePassword = (password: string) => {
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  return passwordRegex.test(password); //* checks whether the entered password matches the specified condition and returns true or false accordingly
};
