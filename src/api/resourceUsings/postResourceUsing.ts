import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { ResoureUsingNumberDateRequestDTO } from "@/config/dto/request";
import { apiUrl } from "@/utils/api";
import { ResourceUsing } from "@/config/erd";

export default async (
  data: ResoureUsingNumberDateRequestDTO
): Promise<ResourceUsing | null> => {
  const url = apiUrl("/ResourceUsing");
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
