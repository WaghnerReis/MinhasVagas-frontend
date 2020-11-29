import React, { createContext, useCallback, useContext } from 'react';

import { Company } from "../interfaces";

import {useMutation, useApolloClient } from "@apollo/client";
import {CREATE_COMPANY, DELETE_COMPANY, UPDATE_COMPANY} from '../graphql/company'

interface CompanyContextData {
   updateCompanyRequest(id: string, data: Company): void
    createCompanyRequest(data: Company): Promise<number>
    deleteCompanyRequest(id: string): void
}

const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData)

export const CompanyProvider: React.FC = ({children}) => {
 const apolloClient = useApolloClient()  
  const updateCompanyRequest = useMutation(UPDATE_COMPANY)  
  const deleteCompanyRequest = useMutation(DELETE_COMPANY)  
 
  const updateCompany = useCallback((id: string, data: Company)=> {
    const [updateCompanyMutation] = updateCompanyRequest
    updateCompanyMutation({variables: {id, data}})
  }, [updateCompanyRequest])

  const createCompany = useCallback(async (companyData: Company)=> {
    const { data: { createCompany } } = await apolloClient.mutate({
      mutation: CREATE_COMPANY,
      variables: { data: companyData },
    });

    return createCompany._id
  }, [apolloClient])

  const deleteCompany = useCallback((id: string)=> {
    const [deleteCompanyMutation] = deleteCompanyRequest
    deleteCompanyMutation({variables: {id}})
  }, [deleteCompanyRequest])

    return (
      <CompanyContext.Provider value={{updateCompanyRequest: updateCompany, createCompanyRequest: createCompany, deleteCompanyRequest: deleteCompany}}>
        {children}
      </CompanyContext.Provider>
  )
}

export function useCompany(): CompanyContextData {
    const context = useContext(CompanyContext)
    return context
}
