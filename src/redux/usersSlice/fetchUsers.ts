import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL, SUCCESS_STATUS_CODE } from "@/config/api";
import { mapDateToString } from "@/utils/mapper";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const url = `${SERVER_URL}/api/v0/User/getAll`;

  const body = {
    page: 1,
    limit: 10,
  };

  const response = await axios.post(url, {
    ...body,
  });

  if (response.status === SUCCESS_STATUS_CODE) {
    const { data } = response;

    const mappedData = data.map((user: unknown) => mapDateToString(user));

    console.log(data);

    return mappedData;
  }

  return [];
});
