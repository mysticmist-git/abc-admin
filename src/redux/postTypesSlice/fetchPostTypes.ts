import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { PaginationParams } from "../common";
import { apiUrl } from "@/utils/api";

export const fetchPostTypes = createAsyncThunk(
  "postTypes/fetchAll",
  async (params?: PaginationParams) => {
    const { page = 1, limit = 10 } = params ?? {};

    const url = apiUrl("/PostType/getAll");

    const response = await axios.post(url, {
      page,
      limit,
    });

    if (response.status === SUCCESS_STATUS_CODE) {
      const { data } = response;
      return data;
    }

    return [];
  }
);
