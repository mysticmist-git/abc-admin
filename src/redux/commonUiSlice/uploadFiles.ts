import { createAsyncThunk } from "@reduxjs/toolkit";

import uploadFiles from "@/api/common/uploadFiles";

export default createAsyncThunk("common/uploadFiles", async (data: File[]) => {
  return await uploadFiles(data);
});
