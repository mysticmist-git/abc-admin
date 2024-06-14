import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { UserRequestDTO } from "@/config/dto/request";
import { apiUrl } from "@/utils/api";
import { User } from "@/config/erd";

export default async (data: UserRequestDTO): Promise<User | null> => {
  const url = apiUrl("/User");
  const body = [data];

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === SUCCESS_STATUS_CODE) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
