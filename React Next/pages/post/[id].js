// Dynamic routing
// post/[id] .js
// NExt 현재버전에서는 이걸 지원함.. 이전버전은 express 로 이걸 처리함

import React from 'react';
// 검색엔진 노출 강화???
import Head from 'next/head';

import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_SINGLE_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}놈의 게시글</title>
        <meta name="description" content={singlePost.content} />
        {/* og는 공유하기 하면 미리보기 뜨잖아,  대략적인 설명같은거 이렇게 그리고 링크 눌리면 가는 주소가 og:url */}
        <meta property="og:title" content={`${singlePost.User.nickname}놈의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://localhost:3000/favicon.ico'} />
        <meta property="og:url" content={`https://localhost:3000/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
      <div>{id}번 게시글</div>
    </AppLayout>
  );
};

// 대부분은 서버사이드 프롭스가 괜찮으니 ㄱㄱㄱㄱ
// 좋아요를 눌럿을 수도 잇고 댓글이 실시간으로 변경될 수 있고
export default Post;

// SSR 프롭스는 context.query Id 나 context.params id 로 접근
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start---');
  console.log('context review : ', context.req);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: parseInt(context.params.id, 10),
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end===');
  await context.store.sagaTask.toPromise();
});
