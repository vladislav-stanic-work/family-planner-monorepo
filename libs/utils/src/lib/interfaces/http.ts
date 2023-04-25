export interface IHttpResponse<T> {
  success: boolean;
  // Should be Enum
  errorCode?: number;
  data: T;
}
