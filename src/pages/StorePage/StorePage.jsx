import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Row, Col, Card, Divider, Button, Select, Spin } from 'antd';

import { fetchGames } from '../../redux/slices/gamesSlice';

import * as S from './StorePage.styled';

const slicedList = (arr, page, perPage) => arr.slice(0, page * perPage);

const filteredListByProvider = (arr, value) =>
  arr.filter((item) => item.provider === value);

const filteredListByCurrency = (arr, value) =>
  arr.filter((item) => Object.keys(item.real).includes(value));

const StorePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [gamesList, setGamesList] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterByProvider, setFilterByProvider] = useState(null);
  const [filterByCurrency, setFilterByCurrency] = useState(null);

  const { isFetchingList, list, providers, currencies } = useSelector(
    (state) => state.games,
  );

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchGames());
    }
  }, [dispatch, list]);

  useEffect(() => {
    if (list.length) {
      setGamesList(slicedList(list, currentPage, perPage));
    }
  }, [list]);

  const handleChangeCurrency = (value) => {
    const filteredList = filteredListByCurrency(list, value);

    setCurrentPage(1);
    setFilterByCurrency(value);
    setGamesList(slicedList(filteredList, 1, perPage));
  };

  const handleChangeProvider = (value) => {
    const filteredList = filteredListByProvider(list, value);

    setCurrentPage(1);
    setFilterByProvider(value);
    setGamesList(slicedList(filteredList, 1, perPage));
  };

  const handleClientPagination = () => {
    let filteredList = list;

    if (filterByCurrency) {
      filteredList = filteredListByCurrency(filteredList, filterByCurrency);
    }

    if (filterByProvider) {
      filteredList = filteredListByProvider(filteredList, filterByProvider);
    }

    setGamesList(slicedList(filteredList, currentPage + 1, perPage));
    setCurrentPage((prevState) => prevState + 1);
  };

  if (isFetchingList) {
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
      <S.Inner>
        <S.Filter>
          <Select
            placeholder="Currency"
            onChange={handleChangeCurrency}
            options={currencies.map((currency) => ({
              label: currency,
              value: currency,
            }))}
            size="large"
          />

          <Select
            placeholder="Provider"
            onChange={handleChangeProvider}
            options={providers.map((provider) => ({
              label: provider,
              value: provider,
            }))}
            size="large"
          />
        </S.Filter>

        <Divider />

        <Row gutter={[24, 24]}>
          {gamesList.map((item) => (
            <Col key={item.id} span={6}>
              <Card
                cover={
                  <img
                    alt="example"
                    src={`https://cdn2.softswiss.net/i/s2/${item.id}.png`}
                  />
                }
                bordered={false}
                onClick={() => navigate(item.id)}
                hoverable
              >
                {item.title}
              </Card>
            </Col>
          ))}
        </Row>

        {gamesList.length ? (
          <Row justify="center">
            <Col span={4}>
              <Button size="large" onClick={handleClientPagination} block>
                Load more
              </Button>
            </Col>
          </Row>
        ) : null}
      </S.Inner>
    </S.Layout>
  );
};

export default StorePage;
