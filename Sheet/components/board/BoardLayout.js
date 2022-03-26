import react from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

const BoardLayout = () => {
  const nullData = null;

  return (
    <div>
      <Button title="UPDATE">UPDATE</Button>
      <Button title="DELETE">DELETE</Button>
      <Button title="신고">신고</Button>
    </div>
  )
};

export default BoardLayout;