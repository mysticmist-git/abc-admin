import { createAsyncThunk } from "@reduxjs/toolkit";

import { PostTypeRequestDTO } from "@/config/dto/request";
import { putPostType } from "@/api/postType";

export default createAsyncThunk(
  "postTypes/put",
  async (data: PostTypeRequestDTO) => {
    return await putPostType(data);
  }
);
