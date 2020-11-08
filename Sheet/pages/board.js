import React from 'react';
import { Button, Table } from 'antd';

import AppLayout from '../components/AppLayout';

import Notice from '../components/board/notice';

const Board = () => {

  const columns = [
    {
      title: '번호',
      width: 50,
      dataIndex: 'index',
      key: 'index',
      fixed: 'left',
    },
    {
      title: 'Title',
      width: 200,
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
    },
    {
      title: 'Writer',
      dataIndex: 'writer',
      key: 'writer',
      width: 150,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
    },
    {
      title: '-',
      dataIndex: 'sub',
      key: 'sub',
      width: 25,
    },
  ];

  const dataSource = [
    {
      index: 1,
      title: '뭐임',
      writer: 'test',
      date: '2020-11-11',
    },
    {
      index: 2,
      title: '뭐임2',
      writer: 'test2',
      date: '2020-11-13',
    },
  ];

  return (
    <AppLayout>
      <Notice />
      <div>여기다가 그거 렌더링 할거야 리스트</div>
      <Table columns={columns} dataSource={dataSource} sticky
        onRow={(record, rowIndex) => {
          return {
            onClick: event => { console.log('rowIndex', rowIndex, record) },
          }
        }}
      />
      <div>
        <Button type="primary"
        >글쓰기</Button>
      </div>

    </AppLayout>
  );
};

export default Board;