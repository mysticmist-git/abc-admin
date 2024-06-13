import { createAsyncThunk } from "@reduxjs/toolkit";

import { postPostType } from "@/api/postTypes";
import { PostTypeRequestDTO } from "@/config/dto/request";

export default createAsyncThunk(
  "postTypes/create",
  async (data: PostTypeRequestDTO) => {
    return await postPostType(data);
  }
);
