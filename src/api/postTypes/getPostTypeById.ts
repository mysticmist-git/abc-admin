import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { apiUrl } from "@/utils/api";
import { PostTypeRequestDTO } from "@/config/dto/request";
import { PostType } from "@/config/erd";

export default async (id: string) => {
  const url = apiUrl("/PostType/get");

  try {
    const response = await axios.post(url, [id.toString()]);

    if (response.status === SUCCESS_STATUS_CODE) {
      const { data } = response;

      const firstData: PostType = data?.[0];

      const requestDTO: PostTypeRequestDTO | null = firstData
        ? {
            id: firstData.id,
            description: firstData.description,
            name: firstData.name,
            permissionIdToCRUD: firstData.permissionIdToCRUD,
            permissionIdToCRUDPost: firstData.permissionIdToCRUDPost,
            status: firstData.status,
          }
        : null;

      return requestDTO;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
