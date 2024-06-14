import { createAsyncThunk } from "@reduxjs/toolkit";

import getUserByUid from "@/api/users/getUserByUid";

export default createAsyncThunk("users/fetchByUid", async (uid: string) => {
  return await getUserByUid(uid);
});
