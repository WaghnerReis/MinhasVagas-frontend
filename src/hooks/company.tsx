import React, { createContext, useCallback, useContext } from 'react';

import { Company } from "../interfaces";

import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import {COMPANIES, COMPANY, CREATE_COMPANY, UPDATE_COMPANY} from '../graphql/company'

interface CompanyContextData {
    companiesRequest(): [Company]
    companyRequest(id: string): Promise<Company>
    updateCompanyRequest(id: string, data: Company): void
    createCompanyRequest(data: Company): Promise<number>
}

const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData)

export const CompanyProvider: React.FC = ({children}) => {
  const companiesRequest = useQuery(COMPANIES)  
  const apolloClient = useApolloClient()  
  const updateCompanyRequest = useMutation(UPDATE_COMPANY)  

  const companies = useCallback(()=>{
    const { loading, data } = companiesRequest
  
    const companies = loading ? null : data.companies;
    return companies
  }, [companiesRequest])
    
  const company = useCallback(async (id: string)=>{
    const { data } = await apolloClient.query({
      query: COMPANY,
      variables: { id },
    });

    const company = data ? data.company : null;
    return company
  }, [apolloClient])
    
  const updateCompany = useCallback((id: string, data: Company)=> {
    const [updateCompanyMutation] = updateCompanyRequest
    updateCompanyMutation({variables: {id, data}})
  }, [updateCompanyRequest])

  const createCompany = useCallback(async (companyData: Company)=> {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_COMPANY,
      variables: { data: companyData },
    });

    return data.createCompany._id
  }, [apolloClient])

    return (
      <CompanyContext.Provider value={{companiesRequest: companies, companyRequest: company, updateCompanyRequest: updateCompany, createCompanyRequest: createCompany}}>
        {children}
      </CompanyContext.Provider>
  )
}

export function useCompany(): CompanyContextData {
    const context = useContext(CompanyContext)
    return context
}
