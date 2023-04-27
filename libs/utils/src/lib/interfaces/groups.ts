export interface IGroup {
  id: string;
  name: string;
  adminId: string;
}

export interface IGroupList extends IGroup {
  memberIds: string[];
}

export interface IGroupDetails extends IGroup {
  admin: {
    id: string;
    name: string;
  };
  description: string;
  members: {
    id: string;
    name: string;
  }[];
}
