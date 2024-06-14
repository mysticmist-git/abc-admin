import axios from "axios";

import { NO_CONTENT, SUCCESS_STATUS_CODE } from "@/config/api/api";
import { apiUrl } from "@/utils/api";
import { ResoureUsingNumberDateRequestDTO } from "@/config/dto/request";

export default async (data: ResoureUsingNumberDateRequestDTO) => {
  const url = apiUrl("/ResourceUsing");
  const body = [data];

  try {
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return (
      response.status === SUCCESS_STATUS_CODE || response.status === NO_CONTENT
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
