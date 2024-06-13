import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPostTypeById } from "@/api/postTypes";

export default createAsyncThunk("postTypes/fetchById", async (id: string) => {
  return await getPostTypeById(id);
});
