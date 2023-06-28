import styled from 'styled-components/macro';

import { Layout } from 'antd';

const Header = styled(Layout.Header)`
  background-color: ${({ theme }) => theme.colorWhite};
  display: flex;
  align-items: center;

  h3 {
    color: ${({ theme }) => theme.colorPrimary};
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
  }
`;

export { Header };
