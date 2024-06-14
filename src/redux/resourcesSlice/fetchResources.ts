import { createAsyncThunk } from "@reduxjs/toolkit";

import { PaginationParams } from "../common";
import getResources from "./getResources";

export const fetchResources = createAsyncThunk(
  "fetchResources/fetch",
  async (params?: PaginationParams) => {
    return await getResources(params);
  }
);
