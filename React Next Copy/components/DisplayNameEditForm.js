import { Form, Input } from 'antd';

import stc from 'styled-components';

const DisplayNameEditForm = () => {
  return (
    <FormMargin>
      <Input.Search addonBefore="Display Name" enterButton="SUBMIT" />
    </FormMargin>
  )
};

const FormMargin = stc(Form)`
  margin: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

export default DisplayNameEditForm;