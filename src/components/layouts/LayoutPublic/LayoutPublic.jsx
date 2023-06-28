import React from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';
import { LayoutHeader } from '../';

import * as S from './LayoutPublic.styled';

const LayoutPublic = () => (
  <Layout>
    <LayoutHeader />

    <S.Content>
      <Outlet />
    </S.Content>
  </Layout>
);

export default LayoutPublic;
