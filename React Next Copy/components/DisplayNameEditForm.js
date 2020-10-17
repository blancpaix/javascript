import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import stc from 'styled-components';

import useInput from '../hooks/useInput';
import { CHANGE_DISPLAYNAME_REQUEST } from '../reducers/user';

const DisplayNameEditForm = () => {
  const dispatch = useDispatch();
  const { me, changeDisplayNameLoading, changeDisplayNameError } = useSelector((state) => state.user);
  const [displayName, setDisplayName] = useInput(me?.nickname || '');
  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_DISPLAYNAME_REQUEST,
      data: { displayName, id: me.id },
    });
  }, [displayName]);

  return (
    <>
      <FormMargin>
        <Input.Search
          addonBefore="Display Name"
          enterButton="SUBMIT"
          value={displayName}
          onChange={setDisplayName}
          loading={changeDisplayNameLoading}
          onSearh={onSubmit}
        />
      </FormMargin>
      {changeDisplayNameError ? <div>에러가 발생했다는데요....</div> : null}
    </>
  );
};

const FormMargin = stc(Form)`
  margin: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

export default DisplayNameEditForm;
