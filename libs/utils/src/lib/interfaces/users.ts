export interface IUserBase {
  name: string;
  email: string;
}

export interface IUser extends IUserBase {
  id: string;
  role?: string;
}

export interface IUserDetails extends IUser {
  description: string;
  groups: {
    id: string;
    name: string;
  }[];
}

export interface IUserUpdate {
  name?: string;
  removedGroupIds?: string[];
  addedGroupIds?: string;
  description?: string;
}
