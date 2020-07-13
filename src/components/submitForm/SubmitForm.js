import React from 'react';
import {
  Form, Input, InputNumber, Button,
} from 'antd';
import 'antd/dist/antd.css';
import { Formik } from 'formik';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import getData from '../../data/data';

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 10,
  },
};

const onSubmit = () => {
  console.log('hello');
};

const SubmitForm = () => (
  <Formik onSubmit={onSubmit}>
    <Form name="nest-messages">
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['Password', 'Password']}
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['Password again', 'Password again']}
        label="Password again"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Website"
        label="Website"
        rules={[
          {
            type: 'Website',
          },
        ]}
      >
        <Input placeholder="http://www.my-site.ru" />
      </Form.Item>
      <Form.Item
        name={['user ', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 1,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      {/* Добавляем скилы */}
      <Form.List name="names">
        {(fields, { add, remove }) => (
          <div>
            {fields.map((field) => (
              <Form.Item required={false} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="passenger name" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 0 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                style={{ width: '60%' }}
              >
                <PlusOutlined />
                {' '}
                Add field
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Formik>
);

export default SubmitForm;
