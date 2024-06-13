import {
  API_WITHOUT_VERSION_URL,
  API_WITH_VERSION_URL,
} from "@/config/api/api";

export const apiUrl = (path: string, options?: { withVersion?: boolean }) => {
  const { withVersion = true } = options || {};
  return `${
    withVersion ? API_WITH_VERSION_URL : API_WITHOUT_VERSION_URL
  }${path}`;
};
