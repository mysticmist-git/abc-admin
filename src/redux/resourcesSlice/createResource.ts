import { createAsyncThunk } from "@reduxjs/toolkit";

import { postResource } from "@/api/resources";
import { ResourceRequestWithStringImages } from "@/config/dto/request";

export default createAsyncThunk(
  "resources/create",
  async (data: ResourceRequestWithStringImages) => {
    return await postResource(data);
  }
);
