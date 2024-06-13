import { createAsyncThunk } from "@reduxjs/toolkit";

import getResourceById from "@/api/resources/getResourceById";

export default createAsyncThunk("resources/fetchById", async (id: string) => {
  return await getResourceById(id);
});
