import { createAsyncThunk } from "@reduxjs/toolkit";

import { deleteResoureUsing } from "@/api/resourceUsings";

export default createAsyncThunk("resources/remove", async (data: number) => {
  const isSuccessful = await deleteResoureUsing(data);

  if (isSuccessful) {
    return data;
  }
  return -1; // Represent no id to removed
});
