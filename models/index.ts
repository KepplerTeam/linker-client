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
