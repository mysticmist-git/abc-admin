import axios from "axios";

import { NO_CONTENT, SUCCESS_STATUS_CODE } from "@/config/api/api";
import { apiUrl } from "@/utils/api";

export default async (data: number): Promise<boolean> => {
  const url = apiUrl("/ResourceUsing");
  const body = [data];

  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });

    console.log(response);

    return (
      response.status === SUCCESS_STATUS_CODE || response.status === NO_CONTENT
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
