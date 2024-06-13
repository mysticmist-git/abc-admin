import { createAsyncThunk } from "@reduxjs/toolkit";

import { ResourceRequestDTO } from "@/config/dto/request";
import { putResource } from "@/api/resources";

export default createAsyncThunk(
  "resources/put",
  async (data: ResourceRequestDTO) => {
    return await putResource(data);
  }
);
