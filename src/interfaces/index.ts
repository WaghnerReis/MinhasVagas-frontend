export interface Company {
  _id: string,
  logo?: string,
  name?: string,
  address?: string,
  description?: string,  
  whatWeOffer?: string,
  }

export interface JobOpening {
    _id: string,
    name: string,
    nivel: string,
    contract: string,
    activitiesAndResponsibilities: string,
    requirements: string,
    remuneration: string,
    company: Company
  }