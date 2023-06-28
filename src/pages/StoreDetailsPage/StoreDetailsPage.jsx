import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Button, Typography, Spin } from 'antd';

import { fetchGameById } from '../../redux/slices/gamesSlice';

import * as S from './StoreDetailsPage.styled';

const { Title } = Typography;

const StoreDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { provider, name } = useParams();

  const { isFetchingDetails, details } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGameById(`${provider}/${name}`));
  }, [dispatch, provider, name]);

  if (isFetchingDetails) {
    return (
      <Row justify="center">
        <Col>
          <Spin />
        </Col>
      </Row>
    );
  }

  return (
    <S.Layout>
      <Title>{details ? details.title : 'Not found'}</Title>

      <Button onClick={() => navigate('/')} size="large">
        Go to Home page
      </Button>
    </S.Layout>
  );
};

export default StoreDetailsPage;
