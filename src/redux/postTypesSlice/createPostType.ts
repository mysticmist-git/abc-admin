import { createAsyncThunk } from "@reduxjs/toolkit";

import { postPostType } from "@/api/postType";
import { PostTypeRequestDTO } from "@/config/dto/request";

export default createAsyncThunk(
  "postTypes/post",
  async (data: PostTypeRequestDTO) => {
    return await postPostType(data);
  }
);
