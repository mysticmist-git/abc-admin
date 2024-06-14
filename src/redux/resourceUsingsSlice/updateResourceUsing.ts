import { createAsyncThunk } from "@reduxjs/toolkit";

import putResourceUsing from "@/api/resourceUsings/putResourceUsing";
import { ResoureUsingNumberDateRequestDTO } from "@/config/dto/request";

export default createAsyncThunk(
  "resourceUsings/put",
  async (data: ResoureUsingNumberDateRequestDTO) => {
    await putResourceUsing(data);
    return data;
  }
);
