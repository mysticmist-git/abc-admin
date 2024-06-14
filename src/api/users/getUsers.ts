import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { apiUrl } from "@/utils/api";
import { PaginationParams } from "@/redux/common";

export default async (params?: PaginationParams) => {
  const { page = 1, limit = 10 } = params ?? {};

  const url = apiUrl("/User/getAll");

  const response = await axios.post(url, {
    page,
    limit,
  });

  if (response.status === SUCCESS_STATUS_CODE) {
    const { data } = response;
    return data;
  }

  return [];
};
