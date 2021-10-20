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
