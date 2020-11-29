import { gql } from '@apollo/client';

export const JOB_OPENINGS = gql`
query {
  jobOpenings{
    _id
    name
    remuneration
    nivel
    contract
    company {
      _id
      logo
      name
      address
    }
  }
}
`

export const JOB_OPENING = gql` 
query ($id: ID!) {
  jobOpening(id: $id) {
    _id
    name
    remuneration
    nivel
    contract
    activitiesAndResponsibilities
    requirements
    
    company {
      _id
      name
      address
      logo
      description
      whatWeOffer
    }
  }
}
`

export const UPDATE_JOB_OPENING = gql` 
mutation ($id: ID!, $data: JobOpeningInput!){
  updateJobOpening(id: $id, data:$data)
  {
    name
    company {
      name
    }
  }
} 
`
export const CREATE_JOB_OPENING = gql` 
mutation ($data: JobOpeningInput!){
  createJobOpening(data:$data)
  {
    name
    company {
      name
    }
  }
} 
`