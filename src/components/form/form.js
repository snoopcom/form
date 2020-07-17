import React from 'react';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import {
  Form,
  Input,
  InputNumber,
  Table,
  AddRowButton,
  Checkbox,
  SubmitButton,
  ResetButton,
} from 'formik-antd';
import {
  MailOutlined, UserOutlined, LinkOutlined, ThunderboltOutlined,
} from '@ant-design/icons';

import getData from '../../dataRequest/DataRequest';
import './form.scss';

const initState = {
  loading: false,
  userCreatingErrorMessage: null,
  successMessage: null,
  netErrorMessage: null,
};

class SubmitForm extends React.Component {
  state = initState;

  /* поля, которые отправляются на сервер */
  initialValues = {
    name: '',
    password: '',
    passConfir: '',
    email: '',
    site: '',
    age: null,
    skills: [''],
    acceptTerms: false,
  };

  onSubmit = async (values) => {
    const body = {
      ...values,
    };

    try {
      /* объект с данными */
      const response = await getData(body);
      const { data } = response;
      console.log(response);
      this.setState({
        // userCreatingErrorMessage: null,
        // netErrorMessage: null,
        successMessage: data,
      });
    } catch (err) {
      if (err) {
        this.setState({
          netErrorMessage: 'Сервер не отвечает',
        });
      }
      /*
      this.setState({
        userCreatingErrorMessage: err.response.data,
        successMessage: null,
        netErrorMessage: null,
      }); */
    }
  };

  render() {
    const { userCreatingErrorMessage, successMessage, netErrorMessage } = this.state;
    return (
      <Formik onSubmit={this.onSubmit} initialValues={this.initialValues}>
        <Form>
          <div>
            <label htmlFor="name">
              Имя
              <span className="required-star"> *</span>
            </label>
            <Form.Item name="name">
              <Input
                id="name"
                name="name"
                placeholder="Алексей"
                size="large"
                suffix={<UserOutlined />}
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="password">
              Пароль
              <span className="required-star"> *</span>
            </label>
            <Form.Item name="password">
              <Input.Password
                id="password"
                name="password"
                placeholder="My-password-123"
                size="large"
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="passConfir">
              Повторите пароль
              <span className="required-star"> *</span>
            </label>
            <Form.Item name="passConfir">
              <Input.Password
                id="passConfir"
                name="passConfir"
                placeholder="My-password-123"
                size="large"
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="email">
              Почта
              <span className="required-star"> *</span>
            </label>
            <span className="error">{userCreatingErrorMessage}</span>
            <Form.Item name="email">
              <Input
                id="email"
                name="email"
                placeholder="my@mail.ru"
                size="large"
                onChange={this.handleClearCloneError}
                suffix={<MailOutlined />}
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="site">Ваш сайт</label>
            <Form.Item name="site">
              <Input
                id="site"
                name="site"
                placeholder="http://www.my-site.ru"
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
            <Table
              name="skills"
              rowKey={(row) => `${row.id}`}
              size="small"
              pagination={false}
              columns={[
                {
                  title: 'Skills',
                  key: 'name',
                  render: (text, record, i) => (
                    <Input
                      name={`skills[${i}]`}
                      placeholder="умею вкусно поесть"
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
              id="addSkill"
            >
              Добавить skill
            </AddRowButton>
          </div>
          <div>
            <Form.Item name="acceptTerms" shouldUpdate={false}>
              <Checkbox id="acceptTerms" name="acceptTerms" />
              <label htmlFor="acceptTerms">
                <span> Согласен с условиями</span>
                <span className="required-star"> *</span>
              </label>
            </Form.Item>
          </div>
          <div className="formButtonsContainer">
            <SubmitButton disabled={false} size="large" className="button">
              Зарегистрироваться
            </SubmitButton>
            <ResetButton size="large" className="button">
              Очистить форму
            </ResetButton>
          </div>
          <span>{successMessage}</span>
          <span>{netErrorMessage}</span>
        </Form>
      </Formik>
    );
  }
}

export default SubmitForm;
