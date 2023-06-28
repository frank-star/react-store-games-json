import styled from 'styled-components/macro';

const Layout = styled.div`
  .ant-divider {
    margin: 0;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  .ant-select {
    width: 18rem;
  }
`;

export { Layout, Inner, Filter };
