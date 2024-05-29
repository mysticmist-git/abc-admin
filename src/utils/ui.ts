import { ApiCallStatus } from "@/redux/common";

export const isLoading = (status: ApiCallStatus) =>
  ["loading"].includes(status);
