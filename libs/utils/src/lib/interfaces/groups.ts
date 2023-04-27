export interface IGroup {
  id: string;
  name: string;
  memberIds: string[];
  adminId: string;
}

export interface IGroupDetails extends IGroup {
  admin: {
    id: string;
    name: string;
  };
  description: string;
}
