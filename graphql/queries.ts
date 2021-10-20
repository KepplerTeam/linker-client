import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GET_USERS($filter: FilterFindManyUserInput) {
    users(filter: $filter) {
      username
      _id
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
