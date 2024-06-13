import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPostTypeById } from "@/api/postType";

export default createAsyncThunk("postTypes/fetchById", async (id: string) => {
  return await getPostTypeById(id);
});
