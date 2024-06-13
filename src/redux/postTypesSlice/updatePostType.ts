import { createAsyncThunk } from "@reduxjs/toolkit";

import { PostTypeRequestDTO } from "@/config/dto/request";
import { putPostType } from "@/api/postTypes";

export default createAsyncThunk(
  "postTypes/put",
  async (data: PostTypeRequestDTO) => {
    return await putPostType(data);
  }
);
