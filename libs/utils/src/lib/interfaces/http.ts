import { Error_Codes } from '../enums';

export interface IHttpResponse<T> {
  success: boolean;
  // Should be Enum
  errorCode?: typeof Error_Codes;
  data: T;
}
