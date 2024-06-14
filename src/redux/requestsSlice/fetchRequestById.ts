import { createAsyncThunk } from "@reduxjs/toolkit";

import getResourceById from "@/api/resources/getResourceById";

export default createAsyncThunk("requests/fetchById", async (id: string) => {
  return await getResourceById(id);
});
