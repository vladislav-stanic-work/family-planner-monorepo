export interface IUserBase {
  name: string;
  email: string;
}

export interface IUser extends IUserBase {
  _id: string;
}
