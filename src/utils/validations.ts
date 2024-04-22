import { Keyboard } from "react-native";
import { IInputs } from "../types";

type SignupParams = {
  inputs: IInputs;
  handleError: (message: string | null, field: keyof IInputs) => void;
};

type LoginParams = {
  values: {
    email: string;
    password: string;
  };
  handleError: (message: string | null, field: keyof IInputs) => void;
};

export const validateSignup = ({ inputs, handleError }: SignupParams) => {
  Keyboard.dismiss();
  let valid = true;
  if (!inputs.firstName) {
    handleError("please enter your first name", "firstName");
    valid = false;
  }
  if (!inputs.lastName) {
    handleError("please enter your last name", "lastName");
    valid = false;
  }

  if (!inputs.address) {
    handleError("please enter your address", "address");
    valid = false;
  } else if (!inputs.address.includes(",")) {
    handleError(
      "please provide your address using this format (city,country)",
      "address"
    );
    valid = false;
  }

  if (!inputs.email) {
    handleError("Please enter your email", "email");
    valid = false;
  } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
    handleError("Please enter a valid email", "email");
    valid = false;
  }
  if (!inputs.password) {
    handleError("Please enter password", "password");
    valid = false;
  } else if (inputs.password.length < 6) {
    handleError("Minimum password length is 6", "password");
    valid = false;
  }
  if (!inputs.confirmPassword) {
    handleError("Please enter confirmation password", "confirmPassword");
    valid = false;
  } else if (inputs.confirmPassword !== inputs.password) {
    handleError("Passwords Must Match", "confirmPassword");
    valid = false;
  }

  return valid;
};

export const validateLogin = ({ values, handleError }: LoginParams) => {
  Keyboard.dismiss();
  let valid = true;
  if (!values.email) {
    handleError("Please enter email", "email");
    valid = false;
  } else if (!values.email.match(/\S+@\S+\.\S+/)) {
    handleError("Please enter a valid email", "email");
    valid = false;
  }
  if (!values.password) {
    handleError("please enter a password", "password");
    valid = false;
  } else if (values.password.length < 6) {
    handleError("password length cannot be less than 6", "password");
    valid = false;
  }

  return valid;
};
