import axios from "axios";
import { BASE_URL } from "../constants/URL";
import { IInputs } from "../types";

type LoginParams = {
  email: string;
  password: string;
};

export async function Login({ email, password }: LoginParams) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function Register(values: IInputs) {
  try {
    const response = await axios.post(`${BASE_URL}/register/v2`, values);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

type UpdatetUserParams = {
  token: string;
  values: Partial<IInputs>;
  id: string;
};
export async function updateUser({ values, token, id }: UpdatetUserParams) {
  try {
    const response = await axios.put(`${BASE_URL}/profile?id=${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
}
