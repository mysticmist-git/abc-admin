import { createAsyncThunk } from "@reduxjs/toolkit";

import { putResource } from "@/api/resources";
import { ResourceRequestWithStringImages } from "@/config/dto/request";

export default createAsyncThunk(
  "resources/put",
  async (data: ResourceRequestWithStringImages) => {
    await putResource(data);
    return data;
  }
);
