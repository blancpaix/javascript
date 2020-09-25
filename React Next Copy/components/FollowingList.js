import { List, Button, Card } from "antd";

import { StopOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';


const FollowingList = ({ header, data }) => {

  return (
    <List
      style={{ margin: 20, padding: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={<div><Button>More</Button></div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.displayName} />
          </Card>
        </List.Item>
      )}
    />
  )
};

FollowingList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowingList;