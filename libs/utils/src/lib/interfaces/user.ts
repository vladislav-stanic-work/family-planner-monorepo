interface IUserBase {
  name: string;
  email: string;
}

export interface IUser extends IUserBase {
  token: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserRegisterRequest extends IUserBase {
  password: string;
}

export type IUserRegisterResponse = IUserBase;
