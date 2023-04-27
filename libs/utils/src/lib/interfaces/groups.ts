export interface IGroup {
  name: string;
  description: string;
}

export interface IGroupCreate extends IGroup {
  adminId: string;
  memberIds: string[];
}

export interface IGroupDetails extends IGroup {
  admin: {
    id: string;
    name: string;
  };
  members: string[];
}

export interface IGroupDetailsResponse extends IGroupCreate {
  id: string;
}
