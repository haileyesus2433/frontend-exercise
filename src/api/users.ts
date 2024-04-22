import axios from "axios";
import { BASE_URL } from "../constants/URL";

type GetUsersParams = {
  token: string;
  page: number;
};

export async function getUsers({ token, page = 1 }: GetUsersParams) {
  try {
    const response = await axios.get(
      `${BASE_URL}/fetch/dummy/user-v2?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}
