import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserRequestDTO } from "@/config/dto/request";
import { putUser } from "@/api/users";

export default createAsyncThunk("users/put", async (data: UserRequestDTO) => {
  await putUser(data);
  return data;
});
