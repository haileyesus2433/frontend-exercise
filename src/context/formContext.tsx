import { useState, createContext, PropsWithChildren } from "react";
import { IInputs } from "../types";

type ContextValues = {
  inputs: IInputs;
  handleOnChange: (text: string, input: keyof IInputs) => void;
  handleError: (errorMessage: string | null, input: keyof IInputs) => void;
  errors: Partial<IInputs>;
  setErrors: any;
  setInputs: any;
  loading: boolean;
  setLoading: any;
  resetInputs: () => void;
};

const FormContext = createContext<ContextValues>({} as ContextValues);

export const FormProvider = ({ children }: PropsWithChildren) => {
  const [inputs, setInputs] = useState<IInputs>({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    address: "",
    password: "",
    confirmPassword: "",
    isBuyer: false,
    profilePic: "",
  });

  const [errors, setErrors] = useState<IInputs>({} as IInputs);

  const handleOnChange = (text: string, input: keyof IInputs) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage: string | null, input: keyof IInputs) => {
    setErrors((prevErrors) => ({ ...prevErrors, [input]: errorMessage }));
  };

  const [loading, setLoading] = useState(false);

  const resetInputs = () => {
    setInputs({
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      address: "",
      password: "",
      confirmPassword: "",
      isBuyer: false,
      profilePic: "",
    });
  };

  return (
    <FormContext.Provider
      value={{
        inputs,
        handleOnChange,
        handleError,
        errors,
        setErrors,
        loading,
        setLoading,
        resetInputs,
        setInputs,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
