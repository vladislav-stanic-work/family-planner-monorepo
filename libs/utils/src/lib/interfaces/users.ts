export interface IUserBase {
  name: string;
  email: string;
}

export interface IUser extends IUserBase {
  _id: string;
  role?: string;
}

export interface IUserDetails extends IUser {
  description: string;
}
