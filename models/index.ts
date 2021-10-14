interface GraphQLModel {
  _id?: string;
  __typename?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

export interface User extends GraphQLModel {
  username?: string;
}

export interface DocumentModel {
  file?: File;
  id?: string;
  src?: string | ArrayBuffer; // url
  name?: string; // name
}
