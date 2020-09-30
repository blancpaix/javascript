export const initialState = {
  hasMorePost: false,
  mainPosts: [
    {
      id: 'test@test.com',
      User: {
        id: 'test@test.com',
        nickname: 'test1'
      },
      content: 'Dummy post',
      Images: [{
        id: 1,
        src: 'http://blog.jinbo.net/attach/615/200937431.jpg',
      }, {
        id: 2,
        src: 'http://ww2.sjkoreancatholic.org/files/testing_image.jpg',
      }, {
        id: 3,
        src: 'https://s-i.huffpost.com/gen/3948866/thumbs/o-PEPE-THE-FROG-570.jpg?3',
      }],
      Comments: [{
        id: 'com_test1_001',
        User: {
          id:  'test@test.com',
          nickname: 'test1'
        },
        content: 'test1의 댓글1'
      },{
        id: 'com_test1_002',
        User: {
          id:  'test@test.com',
          nickname: 'test1'
        },
        content: 'test1의 댓글2'
      },{
        id: 'com_test1_003',
        User: {
          id:  'test@test.com',
          nickname: 'test1'
        },
        content: 'test1의 댓글3'
      }]
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default :
      return state;
  }
};

export default reducer;