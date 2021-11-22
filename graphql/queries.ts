import { gql } from '@apollo/client';

// Usuarios
export const GET_USERS = gql`
  query GET_USERS($filter: FilterFindManyUserInput) {
    users(filter: $filter) {
      username
      _id
    }
  }
`;

export const GET_USER = gql`
  query GET_USER($filter: FilterFindOneUserInput) {
    user(filter: $filter) {
      username
      dni
      firstName
      lastName
      image
      balance
      enterprise {
        name
        balance
        _id
      }
      summaryShop
    }
  }
`;

// Products
export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($filter: FilterFindManyProductInput) {
    products(filter: $filter) {
      _id
      name
      description
      category
      price
      images
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($filter: FilterFindOneProductInput) {
    product(filter: $filter) {
      _id
      name
      serial
      description
      category
      price
      productStatus
      quantity
      units
      images
      enterprise {
        _id
        name
        owner {
          _id
        }
      }
    }
  }
`;

// Shopping Cart del usuario
export const GET_SHOPPING_CART = gql`
  query GET_SHOPPING_CART($filter: FilterFindOneShoppingCartInput) {
    shoppingCart(filter: $filter) {
      _id
      products {
        _id
      }
    }
  }
`;

// Favoritos del usuario
export const GET_FAVORITES = gql`
  query GET_SHOPPING_CART($filter: FilterFindOneFavoritesInput) {
    favorites(filter: $filter) {
      _id
      products {
        _id
      }
    }
  }
`;

// authentication
export const CURRENT_USER = gql`
  query CURRENT_USER {
    currentUser {
      _id
      username
      firstName
      lastName
      image
      email
      role
      balance
      enterprise {
        _id
        balance
      }
      favorites {
        _id
        products {
          _id
          name
          price
          images
          enterprise {
            balance
            _id
          }
        }
      }
      shoppingCart {
        _id
        products {
          _id
          name
          price
          images
          enterprise {
            _id
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_USER_MOBILE = gql`
  mutation GET_CURRENT_USER_MOBILE($data: GetCurrentUserMobile) {
    currentUserMobile(data: $data) {
      _id
      username
      firstName
      lastName
      image
      email
      role
      balance
      enterprise {
        _id
        balance
      }
      favorites {
        _id
        products {
          _id
          name
          price
          images
          enterprise {
            balance
            _id
          }
        }
      }
      shoppingCart {
        _id
        products {
          _id
          name
          price
          images
          enterprise {
            _id
          }
        }
      }
    }
  }
`;

// Factura
export const GET_BILL = gql`
  query GET_BILL($filter: FilterFindOneBillInput) {
    bill(filter: $filter) {
      _id
      totalPrice
      enterpriseOwner {
        _id
      }
      createdAt
      client {
        username
        _id
      }
      products {
        _id
        name
        serial
        description
        category
        price
        images
        rating
      }
    }
  }
`;

export const GET_BILLS = gql`
  query GET_BILLS(
    $filter: FilterFindManyBillInput
    $sort: SortFindManyBillInput
    $limit: Int
  ) {
    bills(filter: $filter, sort: $sort, limit: $limit) {
      _id
      enterpriseOwner {
        _id
      }
      totalPrice
      createdAt
      client {
        username
        _id
      }
      products {
        name
        price
        enterprise {
          name
          balance
          owner {
            _id
          }
        }
      }
    }
  }
`;

// Empresas
export const GET_ENTERPRISE = gql`
  query GET_ENTERPRISE($filter: FilterFindOneEnterpriseInput) {
    enterprise(filter: $filter) {
      _id
      status
      banner
      name
      rating
      category
      balance
      owner {
        _id
      }
      rif
      products {
        _id
        name
        serial
        description
        price
        images
      }
    }
  }
`;

export const GET_ENTERPRISES = gql`
  query GET_ENTERPRISES($filter: FilterFindManyEnterpriseInput) {
    enterprises(filter: $filter) {
      name
      rating
      category
      banner
      balance
      owner {
        _id
        dni
      }
      rif
      products {
        name
        serial
        price
        description
      }
      salesSummary
      _id
    }
  }
`;

// Solicitudes de recarga
export const GET_TRANSACTIONS = gql`
  query GET_TRANSACTIONS(
    $filter: FilterFindManyTransactionInput
    $sort: SortFindManyTransactionInput
  ) {
    transactions(filter: $filter, sort: $sort) {
      _id
      amount
      transactionId
      status
      _id
      clientId {
        _id
        username
        balance
      }
      createdAt
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GET_TRANSACTION(
    $filter: FilterFindOneTransactionInput!
    $sort: SortFindOneTransactionInput
  ) {
    transaction(filter: $filter, sort: $sort) {
      _id
      clientId {
        username
        _id
        balance
      }
      transactionId
      amount
      status
    }
  }
`;
