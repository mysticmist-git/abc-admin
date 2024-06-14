import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { apiUrl } from "@/utils/api";
import { ResourceUsing } from "@/config/erd";
import { ResourceUsingRequestDTO } from "@/config/dto/request";

export default async (id: string) => {
  const url = apiUrl("/ResourceUsing/get");

  try {
    const response = await axios.post(url, [id.toString()]);

    if (response.status === SUCCESS_STATUS_CODE) {
      const { data } = response;

      const firstData: ResourceUsing = data?.[0];

      const requestDTO: ResourceUsingRequestDTO | null = firstData || null;

      return requestDTO;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
