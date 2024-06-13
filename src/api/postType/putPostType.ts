import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { PostTypeRequestDTO } from "@/config/dto/request";
import { apiUrl } from "@/utils/api";

export default async (data: PostTypeRequestDTO) => {
  const url = apiUrl("/PostType");
  const body = [data];

  try {
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.status === SUCCESS_STATUS_CODE;
  } catch (error) {
    console.log(error);
    return false;
  }
};
