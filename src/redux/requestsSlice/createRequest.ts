import { createAsyncThunk } from "@reduxjs/toolkit";

import { RequestRequestDTO } from "@/config/dto/request";
import postRequest from "@/api/requests/postRequest";

export default createAsyncThunk(
  "requests/create",
  async (data: RequestRequestDTO) => {
    return await postRequest(data);
  }
);
