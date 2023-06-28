import React from 'react';

import { Typography } from 'antd';

import * as S from './LayoutHeader.styled';

const { Title } = Typography;

const LayoutHeader = () => (
  <S.Header>
    <Title level={3}>Store App</Title>
  </S.Header>
);

export default LayoutHeader;
