import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { apiUrl } from "@/utils/api";

export default async (data: number): Promise<boolean> => {
  const url = apiUrl("/User");
  const body = [data];

  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });

    return response.status === SUCCESS_STATUS_CODE;
  } catch (error) {
    console.log(error);
    return false;
  }
};
