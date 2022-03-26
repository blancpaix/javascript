import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { Button, Table } from 'antd';
import wrapper from '../store/configureStore';

import AppLayout from '../components/AppLayout';
import Notice from '../components/board/notice';
import BoardLayout from '../components/board/BoardLayout';
import BoardContent from '../components/board/BoardContent';

import { FILTERING_POST, LOAD_POSTS_REQUEST } from '../reducers/board';


const Board = () => {
  const dispatch = useDispatch();
  const { boardPosts, selectedPost, currentSession } = useSelector(state => state.board);

  const onClickWrite = useCallback(() => {
    if (!currentSession || !currentSession.id) return alert('로그인이 필요하오')
    Router.push('/write');
  }, [currentSession]);
  const onClickItem = useCallback((index) => {
    dispatch({
      type: FILTERING_POST,
      data: index,
    });
  }, []);

  const columns = [
    {
      title: '번호',
      width: 50,
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
    },
    {
      title: 'Title',
      width: 200,
      dataIndex: 'title',
      fixed: 'left',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      width: 150,
    },
    {
      title: 'Writer',
      dataIndex: 'UserId',
      width: 150,
    },
    {
      title: '-',
      dataIndex: 'sub',
      width: 25,
    },
  ];

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, [])

  return (
    <AppLayout>
      <Notice />
      <BoardLayout />
      {selectedPost && <BoardContent data={selectedPost} />}
      <div>여기다가 그거 렌더링 할거야 리스트</div>
      <Table columns={columns} dataSource={boardPosts} sticky
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: event => { onClickItem(record.id) },
          }
        }}
      />
      <div>
        <Button type="primary" onClick={onClickWrite}>글쓰기</Button>
      </div>

    </AppLayout>
  );
};

export default Board;