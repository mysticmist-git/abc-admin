export type ApiCallStatus = "idle" | "loading" | "succeeded" | "failed";

export type CommonSliceState<T> = {
  list: T[];
  status: ApiCallStatus;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};
