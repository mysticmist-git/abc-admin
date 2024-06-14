import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { RequestRequestDTO } from "@/config/dto/request";
import { Request } from "@/config/erd";
import { apiUrl } from "@/utils/api";

export default async (id: string) => {
  const url = apiUrl("/Request/get");

  try {
    const response = await axios.post(url, [id.toString()]);

    if (response.status === SUCCESS_STATUS_CODE) {
      const { data } = response;

      const firstData: Request = data?.[0];

      const requestDTO: RequestRequestDTO | null = firstData ? firstData : null;

      return requestDTO;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
