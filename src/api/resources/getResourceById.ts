import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { apiUrl } from "@/utils/api";
import { Resource } from "@/config/erd";
import { ResourceRequestWithStringImages } from "@/config/dto/request";

export default async (id: string) => {
  const url = apiUrl("/Resource/get");

  try {
    const response = await axios.post(url, [id.toString()]);

    if (response.status === SUCCESS_STATUS_CODE) {
      const { data } = response;

      const firstData: Resource = data?.[0];

      const requestDTO: ResourceRequestWithStringImages | null = firstData
        ? {
            description: firstData.description,
            id: firstData.id,
            isFree: firstData.isFree,
            name: firstData.name,
            resourceTypeId: firstData.resourceTypeId,
            status: firstData.status,
            images: firstData.images,
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
