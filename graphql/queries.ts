import { gql } from '@apollo/client';

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
      enterprise {
        name
        _id
      }
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
    }
  }
`;

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

// auth
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
    }
  }
`;
