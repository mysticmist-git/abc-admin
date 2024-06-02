import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api";
import { UserRequestDTO } from "@/config/dto/request";
import { apiUrl } from "@/utils/api";

export const postUser = createAsyncThunk(
  "users/post",
  async (param: UserRequestDTO) => {
    const url = apiUrl("/User");

    const response = await axios.post(url, [param]);

    if (response.status === SUCCESS_STATUS_CODE) {
      return true;
    }

    return false;
  }
);
