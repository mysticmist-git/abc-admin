import { createAsyncThunk } from "@reduxjs/toolkit";

import getResourceUsingById from "@/api/resourceUsings/getResourceUsingById";

export default createAsyncThunk(
  "resourceUsings/fetchById",
  async (id: string) => {
    return await getResourceUsingById(id);
  }
);
