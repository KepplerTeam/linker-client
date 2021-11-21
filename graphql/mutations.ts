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

// Create y Update de productos
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

// Update de usuario
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

// auth - creacion de cuenta
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
// auth - inicio de sesion
export const SIGN_IN = gql`
  mutation SIGN_IN($data: SignInInput) {
    signIn(data: $data) {
      email
      password
    }
  }
`;

// auth - cierre de sesion
export const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signOut {
      success
    }
  }
`;

// Registrar y actualizar empresa
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

// Crear y Actualizar solicitudes de recarga de wallet
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

// Create Update y Delete de shopping Cart
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

// Bill

export const CREATE_BILL = gql`
  mutation CREATE_BILL($data: CreateBillInput) {
    createBill(data: $data) {
      # CreateBillInfoInput {
      enterpriseOwner {
        _id
      }
      client {
        _id
      }
      products {
        _id
      }
      totalPrice
      tax
      status
      _id
    }
  }
`;
// Create Update y Delete de favorites
export const CREATE_FAVORITES = gql`
  mutation CREATE_FAVORITES($record: CreateOneFavoritesInput!) {
    createFavorites(record: $record) {
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

export const UPDATE_FAVORITES = gql`
  mutation UPDATE_FAVORITES(
    $record: UpdateOneFavoritesInput!
    $filter: FilterUpdateOneFavoritesInput
  ) {
    updateFavorites(record: $record, filter: $filter) {
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

export const REMOVE_FAVORITES = gql`
  mutation REMOVE_FAVORITES($filter: FilterRemoveOneFavoritesInput) {
    removeFavorites(filter: $filter) {
      record {
        _id
      }
    }
  }
`;

export const SET_REVIEW = gql`
  mutation SET_REVIEW($data: CreateReviewInput) {
    setReview(data: $data) {
      client {
        _id
      }
      product {
        _id
      }
      enterprise {
        _id
      }
      productComment
      productRating
      enterpriseComment
      enterpriseRating
    }
  }
`;
