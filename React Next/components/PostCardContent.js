import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

// postData: 첫번째 게시글 #해시태그 #익스프레스
const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => { // 인덱스는 잘 안쓰긴하는데... 바뀔일이 없는거는 그냥 index 쓰세요...
      if (v.match(/(#[^\s#]+)/)) {
        return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>;
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
