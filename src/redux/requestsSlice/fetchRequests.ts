import { createAsyncThunk } from "@reduxjs/toolkit";

import { PaginationParams } from "../common";
import { getRequests } from "@/api/requests";

export const fetchRequests = createAsyncThunk(
  "requests/fetch",
  async (params?: PaginationParams) => {
    return await getRequests(params);
  }
);
