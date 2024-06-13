import axios from "axios";

import { GGThumbnail, SUCCESS_STATUS_CODE } from "@/config/api/api";
import { apiUrl } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export default createAsyncThunk(
  "common/uploadFiles",
  async (files: File[]): Promise<string[]> => {
    const url = apiUrl("/File/upload", { withVersion: false });

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await axios.post(url, formData);

    if (response.status === SUCCESS_STATUS_CODE) {
      const { data } = response;
      const urls = data.map(
        (uploadedFile: { id: string }) => `${GGThumbnail}${uploadedFile.id}`
      );
      return urls;
    }

    throw new Error("Upload images fail");
  }
);
