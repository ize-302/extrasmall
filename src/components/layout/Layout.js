import * as React from 'react';

import TopNav from './TopNav';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      {children}
    </>
  );
};

export default DashboardLayout;
