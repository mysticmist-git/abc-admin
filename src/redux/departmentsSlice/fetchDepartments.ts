import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { SERVER_URL, SUCCESS_STATUS_CODE } from "@/config/api";
import { mapDateToString } from "@/utils/mapper";
import { PaginationParams } from "../common";

export const fetchDepartments = createAsyncThunk(
  "departments/fetch",
  async (params?: PaginationParams) => {
    const { page = 1, limit = 10 } = params ?? {};

    const url = `${SERVER_URL}/api/v0/Department/getAll`;

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
  },
);
