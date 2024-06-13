import { createAsyncThunk } from "@reduxjs/toolkit";

import { postResource } from "@/api/resources";
import { ResourceRequestWithFileImagesDTO } from "@/config/dto/request";

export default createAsyncThunk(
  "resources/create",
  async (data: ResourceRequestWithFileImagesDTO) => {
    return await postResource(data);
  }
);
