import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { UserRequestDTO } from "@/config/dto/request";
import { User } from "@/config/erd";
import { apiUrl } from "@/utils/api";

export default async (id: string) => {
  const url = apiUrl("/User/get");

  try {
    const response = await axios.post(url, [id.toString()]);

    if (response.status === SUCCESS_STATUS_CODE) {
      const { data } = response;

      const firstData: User = data?.[0];

      const requestDTO: Omit<UserRequestDTO, "password"> | null =
        { ...firstData, birthday: +firstData.birthday } || null;

      return requestDTO;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
