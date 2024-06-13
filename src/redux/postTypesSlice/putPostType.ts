import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestPutPostType } from "@/api/postType";
import { PostTypeRequestDTO } from "@/config/dto/request";

export const putPostType = createAsyncThunk(
  "postTypes/put",
  async (data: PostTypeRequestDTO) => {
    return await requestPutPostType(data);
  }
);
