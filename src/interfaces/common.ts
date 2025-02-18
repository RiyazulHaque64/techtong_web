export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TResponse<T, M> = {
  success: boolean;
  message: string;
  meta?: TMeta & M;
  data: T;
};
