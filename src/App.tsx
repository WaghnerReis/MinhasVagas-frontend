import React from 'react';

import AppProvider from "./hooks";

import { ApolloProvider } from '@apollo/client';
import client from './services/client'

import { Routes } from "./routes";
import {BrowserRouter} from 'react-router-dom'

import GlobalStyle from './styles/globals'

const App: React.FC = () => (
  <ApolloProvider client={client}>
      <BrowserRouter>
        <AppProvider>
          <Routes/>
        </AppProvider>
      <GlobalStyle/>
    </BrowserRouter>
  </ApolloProvider>
  )




  

export default App;
