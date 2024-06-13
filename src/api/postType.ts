import axios from "axios";

import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import { PostTypeRequestDTO } from "@/config/dto/request";
import { apiUrl } from "@/utils/api";

export const requestPostPostType = async (
  data: PostTypeRequestDTO
): Promise<boolean> => {
  const url = apiUrl("/PostType");
  const body = [data];

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.status === SUCCESS_STATUS_CODE;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Request to update the post type
 *
 * @param data postType body
 * @returns Request status
 */
export const requestPutPostType = async (
  data: PostTypeRequestDTO
): Promise<boolean> => {
  const url = apiUrl("/PostType");
  const body = [data];

  try {
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.status === SUCCESS_STATUS_CODE;
  } catch (error) {
    console.log(error);
    return false;
  }
};
