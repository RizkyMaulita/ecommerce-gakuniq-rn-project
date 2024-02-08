export type ResponseType<T> = {
  statusCode: number;
  message?: string;
  error?: string;
  data?: T;
};
