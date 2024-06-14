import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { RequestRequestDTO } from "@/config/dto/request";
import { apiUrl } from "@/utils/api";

export default async (data: RequestRequestDTO): Promise<Request | null> => {
  const url = apiUrl("/Request");
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
