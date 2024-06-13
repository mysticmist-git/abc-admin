import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { ResourceRequestWithFileImagesDTO } from "@/config/dto/request";
import { apiUrl } from "@/utils/api";

export default async (
  data: ResourceRequestWithFileImagesDTO
): Promise<boolean> => {
  const url = apiUrl("/Resource");
  const body = [data];

  try {
    const response = await axios.post(url, body, {
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
