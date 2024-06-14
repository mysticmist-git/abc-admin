import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserRequestDTO } from "@/config/dto/request";
import { postUser } from "@/api/users";

export default createAsyncThunk(
  "users/create",
  async (data: UserRequestDTO) => {
    return await postUser(data);
  }
);
