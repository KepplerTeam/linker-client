interface GraphQLModel {
  _id?: string;
  __typename?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

export interface User extends GraphQLModel {
  username?: string;
  dni?: string;
  firstName?: string;
  lastName: string;
  image?: string;
  phone?: string;
  email?: string;
  role?: number;
  status?: number;
  category?: number;
  buyerRating?: number;
  summaryShop?: Bill;
  shoppingCart?: ShoppingCart;
  enterprise?: [Enterprise];
  favorites?: Favorite;
  balance?: number;
  // reviewsMade?: BuyerReview;
  // questionsMade?: QuestionsMade;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Bill extends GraphQLModel {
  client?: User;
  products?: [Product];
  totalPrice?: number;
}

export interface DocumentModel {
  file?: File;
  id?: string;
  src?: string | ArrayBuffer; // url
  name?: string; // name
}

export interface Product extends GraphQLModel {
  name?: string;
  serial?: string;
  description?: string;
  category?: number;
  price?: number;
  productStatus?: number;
  images?: Array<string>;
  rating?: number;
  quantity?: number;
  units?: number;
  // review?: Array<BuyerReview>;
  enterprise?: Enterprise;
  uploadedDate?: Date;
  visibility?: number;
  // questions?: Array<Question>;
}

export interface Enterprise extends GraphQLModel {
  name?: string;
  owner?: User;
  rif?: string;
  registrationDate?: Date;
  status?: number;
  rating?: number;
  category?: number;
  products?: Array<Product>;
  banner?: string;
  balance?: number;
  // salesSummary?: Types.ObjectId; //BillDocument[]
  // commentsMadeIt?: Types.ObjectId; //SellerComment[]
}

export interface ShoppingCart extends GraphQLModel {
  products: [Product];
}

export interface Favorite extends GraphQLModel {
  products: [Product];
}

export interface Transaction extends GraphQLModel {
  amount?: number;
  clientId: User;
  transactionId: string;
  status: number;
}
