import React from 'react';

import { Routes } from "./routes";
import {BrowserRouter} from 'react-router-dom'

import GlobalStyle from './styles/globals'

const App: React.FC = () => (
    <BrowserRouter>
  <Routes/>
  <GlobalStyle/>
  </BrowserRouter>
  )




  

export default App;
