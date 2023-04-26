export interface IGroup {
  name: string;
  members: string[];
}

export interface IGroupDetails extends IGroup {
  description?: string;
}

export interface IGroupDetailsResponse extends IGroupDetails {
  _id: string;
}
