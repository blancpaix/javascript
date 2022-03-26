import react from 'react';

const BoardContent = ({ data }) => {
  const nullData = null;
  console.log('selectedPost', data);

  return (
    <div>
      {data.id}
      <br />
      {data.content}
    </div>
  )
};

export default BoardContent;