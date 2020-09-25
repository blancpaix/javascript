import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_DISPLAYNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const DisplayNameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [displayName, onChangeDispalyName] = useInput(me?.nickname || '');
  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_DISPLAYNAME_REQUEST,
      data: displayName,
    });
  }, [displayName]);

  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }));

  return (
    <>
      <Form style={style}>
        <Input.Search
          value={displayName}
          addonBefore="닉네임"
          enterButton="수정"
          onChange={onChangeDispalyName}
          onSearch={onSubmit}
        />
      </Form>
    </>
  );
};

export default DisplayNameEditForm;
