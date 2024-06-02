import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api";
import { mapDateToString } from "@/utils/mapper";
import { PaginationParams } from "../common";
import { apiUrl } from "@/utils/api";

export const fetchResourceUsings = createAsyncThunk(
  "fetchResourceUsings/fetch",
  async (params?: PaginationParams) => {
    const { page = 1, limit = 10 } = params ?? {};

    const url = apiUrl("/ResourceUsing/getAll");

    const response = await axios.post(url, {
      page,
      limit,
    });

    if (response.status === SUCCESS_STATUS_CODE) {
      const { data } = response;
      const mappedData = data.map((user: unknown) => mapDateToString(user));

      return mappedData;
    }

    return [];
  }
);
