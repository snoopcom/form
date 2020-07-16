import React from 'react';
import { Formik } from 'formik';
import {
  Form,
  Input,
  InputNumber,
  AddRowButton,
  Checkbox,
  SubmitButton,
  ResetButton,
} from 'formik-antd';
import {
  MailOutlined, UserOutlined, LinkOutlined, ThunderboltOutlined,
} from '@ant-design/icons';

import getData from '../../dataRequest/DataRequest';
// import './form.scss';

const initState = {
  userCreatingErrorMessage: null,
  successMessage: null,
  netErrorMessage: null,
};

class SubmitForm extends React.Component {
  state = initState;

  /* Это наши поля запроса, которые попадают на сервер */
  initialValues = {
    name: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    website: '',
    age: null,
    skills: [''],
    acceptTerms: false,
  };

  onSubmit = async (values) => {
    const body = {
      ...values,
    };
    try {
      const response = await getData(body);
      const { data } = response;

      this.setState({
        userCreatingErrorMessage: null,
        netErrorMessage: null,
        successMessage: data,
      });
    } catch (err) {
      if (err) {
        this.setState({
          netErrorMessage: 'Сервер не отвечает',
        });
      }
      this.setState({
        userCreatingErrorMessage: err.response.data,
        successMessage: null,
        netErrorMessage: null,
      });
    }
  };

  render() {
    const { successMessage, userCreatingErrorMessage, netErrorMessage } = this.state;

    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.onSubmit}
      >
        <Form className="form" onChange={this.handleClearSuccess}>
          <div>
            <label htmlFor="name">
              Имя
              <span className="required-star"> *</span>
            </label>
            <Form.Item name="name">
              <Input
                id="name"
                name="name"
                placeholder="Иван"
                size="large"
                suffix={<UserOutlined />}
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="pwd">
              Пароль
              <span className="required-star"> *</span>
            </label>
            <Form.Item name="password">
              <Input.Password
                id="pwd"
                name="password"
                placeholder="bu7UYvjl2nkj9WNshd"
                size="large"
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="repwd">
              Повторите пароль
              <span className="required-star"> *</span>
            </label>
            <Form.Item name="passwordConfirmation">
              <Input.Password
                id="repwd"
                name="passwordConfirmation"
                placeholder="bu7UYvjl2nkj9WNshd"
                size="large"
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="email">
              Электропочта
              <span className="required-star"> *</span>
            </label>
            <span className="error">{userCreatingErrorMessage}</span>
            <Form.Item name="email">
              <Input
                id="email"
                name="email"
                placeholder="ivan@mail.ru"
                size="large"
                onChange={this.handleClearCloneError}
                suffix={<MailOutlined />}
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="site">Ваш сайт </label>
            <Form.Item name="website">
              <Input
                id="site"
                name="website"
                placeholder="http://www.ivan.ru"
                size="large"
                suffix={<LinkOutlined />}
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="age">
              Возраст
              <span className="required-star"> *</span>
            </label>
            <Form.Item name="age">
              <InputNumber id="age" name="age" placeholder="27" size="large" />
            </Form.Item>
          </div>
          <div>
            <div
              name="skills"
              rowKey={(row) => `${row.id}`}
              size="small"
              pagination={false}
              columns={[
                {
                  title: 'Cуперспособности',
                  key: 'name',
                  render: (text, record, i) => (
                    <Input
                      name={`skills[${i}]`}
                      placeholder="Телепатия"
                      size="large"
                      suffix={<ThunderboltOutlined />}
                      onPressEnter={this.handleClickButton}
                      autoFocus
                    />
                  ),
                },
              ]}
            />

            <AddRowButton
              name="skills"
              createNewRow={(text) => text || ''}
              size="large"
              type="primary"
              className="skillsButton"
              id="addSkillButton"
            >
              Добавить суперспособность
            </AddRowButton>
          </div>
          <div>
            <Form.Item name="accept" shouldUpdate={false}>
              <Checkbox id="terms" name="accept" />
              <label htmlFor="terms">
                <span className="required-star">Согласен с условиями *</span>
              </label>
            </Form.Item>
          </div>
          acceptTerms
          <div className="formButtonsContainer">
            <SubmitButton disabled={false} size="large" className="button">
              Зарегистрироваться
            </SubmitButton>
            <ResetButton size="large" className="button">
              Очистить форму
            </ResetButton>
          </div>
          <span className="success">{successMessage}</span>
          <span className="error">{netErrorMessage}</span>
        </Form>
      </Formik>
    );
  }
}

export default SubmitForm;
