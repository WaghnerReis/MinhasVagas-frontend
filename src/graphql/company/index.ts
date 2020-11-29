import { gql } from '@apollo/client';

export const COMPANIES = gql`
query {
 companies {
      _id  
      logo
      name
      address
  }
}
`

export const COMPANY = gql` 
query ($id: ID!) {
  company(id: $id) {
      name
      address
      logo
      description
      whatWeOffer
  }
}
`

export const UPDATE_COMPANY = gql` 
mutation ($id: ID!, $data: CompanyInput!){
  updateCompany(id: $id, data:$data)
  {
    _id
  }
} 
`

export const CREATE_COMPANY = gql` 
mutation ($data: CompanyInput!){
  createCompany(data:$data)
  {
    _id
  }
} 
`

export const DELETE_COMPANY = gql` 
mutation ($id: ID!){
  deleteCompany(id: $id)
} 
`