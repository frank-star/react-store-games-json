import React from 'react';
import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './routes';
import { GlobalStyle } from './styles';

const App = () => {
  const routes = useRoutes([publicRoutes]);

  return (
    <>
      <GlobalStyle />
      {routes}
    </>
  );
};

export default App;
