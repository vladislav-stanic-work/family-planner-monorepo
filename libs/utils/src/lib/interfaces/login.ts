import { IUser, IUserBase } from './users';

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserLoginResponse extends IUser {
  token: string;
}

export interface IUserRegisterRequest extends IUserBase {
  password: string;
}

export type IUserRegisterResponse = IUser;
