export type ApiCallStatus = "idle" | "loading" | "succeeded" | "failed";

export type CommonSliceState<T, TRequestDTO> = {
  detail: TRequestDTO | null;
  detailStatus: ApiCallStatus;
  list: T[];
  status: ApiCallStatus;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const COMMON_DEFAULT_STATE: CommonSliceState<any, any> = {
  detail: null,
  detailStatus: "idle",
  list: [],
  status: "idle",
};
