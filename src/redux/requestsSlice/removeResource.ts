import { createAsyncThunk } from "@reduxjs/toolkit";

import { deleteResource } from "@/api/resources";

export default createAsyncThunk("resources/remove", async (data: number) => {
  const isSuccessful = await deleteResource(data);

  if (isSuccessful) {
    return data;
  }
  return -1; // Represent no id to removed
});
