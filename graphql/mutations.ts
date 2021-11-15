import { gql } from '@apollo/client';

// Sign S3 para manejar subida de archivos
export const SIGN_S3 = gql`
  mutation SIGN_S3($data: SignS3Input!) {
    signS3(data: $data) {
      signedRequest
      url
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT($data: CreateProductInput) {
    createProduct(data: $data) {
      name
      serial
      description
      category
      price
      quantity
      units
      images
      enterprise {
        _id
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $filter: FilterUpdateOneProductInput
    $record: UpdateOneProductInput!
  ) {
    updateProduct(filter: $filter, record: $record) {
      record {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $record: UpdateOneUserInput!
    $filter: FilterUpdateOneUserInput
  ) {
    updateUser(record: $record, filter: $filter) {
      record {
        _id
      }
    }
  }
`;

// auth

export const CREATE_USER = gql`
  mutation CREATE_USER($data: CreateUserInput) {
    signUp(data: $data) {
      username
      dni
      firstName
      lastName
      email
      password
      image
    }
  }
`;

export const SIGN_IN = gql`
  mutation SIGN_IN($data: SignInInput) {
    signIn(data: $data) {
      email
      password
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signOut {
      success
    }
  }
`;

export const CREATE_ENTERPRISE = gql`
  mutation CREATE_ENTERPRISE($record: CreateOneEnterpriseInput!) {
    createEnterprise(record: $record) {
      record {
        name
        status
        rating
        banner
        category
        owner {
          _id
        }
        rif
        _id
      }
    }
  }
`;

export const UPDATE_ENTERPRISE = gql`
  mutation UPDATE_ENTERPRISE(
    $record: UpdateOneEnterpriseInput!
    $filter: FilterUpdateOneEnterpriseInput
  ) {
    updateEnterprise(record: $record, filter: $filter) {
      record {
        _id
      }
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CREATE_TRANSACTION($record: CreateOneTransactionInput!) {
    createTransaction(record: $record) {
      record {
        status
        clientId {
          _id
        }
        amount
        transactionId
      }
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UPDATE_TRANSACTION(
    $record: UpdateOneTransactionInput!
    $filter: FilterUpdateOneTransactionInput
  ) {
    updateTransaction(record: $record, filter: $filter) {
      record {
        status
      }
    }
  }
`;

export const CREATE_SHOPPING_CART = gql`
  mutation CREATE_SHOPPING_CART($record: CreateOneShoppingCartInput!) {
    createShoppingCart(record: $record) {
      record {
        products {
          _id
          price
          name
        }
      }
    }
  }
`;

export const UPDATE_SHOPPING_CART = gql`
  mutation UPDATE_SHOPPING_CART(
    $record: UpdateOneShoppingCartInput!
    $filter: FilterUpdateOneShoppingCartInput
  ) {
    updateShoppingCart(record: $record, filter: $filter) {
      record {
        _id
        products {
          _id
          name
          price
        }
      }
    }
  }
`;

export const REMOVE_SHOPPING_CART = gql`
  mutation REMOVE_SHOPPING_CART($filter: FilterRemoveOneShoppingCartInput) {
    removeShoppingCart(filter: $filter) {
      record {
        _id
      }
    }
  }
`;
