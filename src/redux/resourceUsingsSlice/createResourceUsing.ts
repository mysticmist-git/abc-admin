import postResourceUsing from "@/api/resourceUsings/postResourceUsing";
import { ResoureUsingNumberDateRequestDTO } from "@/config/dto/request";
import { createAsyncThunk } from "@reduxjs/toolkit";

export default createAsyncThunk(
  "resourceUsing/create",
  async (data: ResoureUsingNumberDateRequestDTO) => {
    return await postResourceUsing(data);
  }
);
