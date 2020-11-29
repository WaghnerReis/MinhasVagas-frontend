import React from 'react';

import { JobOpeningProvider } from "./jobOpening";
import { CompanyProvider } from "./company";

const AppProvider: React.FC = ({children}) => (
    <CompanyProvider>
      <JobOpeningProvider>
          {children}
      </JobOpeningProvider>
    </CompanyProvider>
  )


export default AppProvider;