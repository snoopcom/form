import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(50, 'Имя должно содержать не более 50 символов')
    .required('Пожалуйста, введите имя'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/,
      'Введите от 8 до 40 символов, как минимум одна цифра и одна заглавная буква',
    )
    .required('Пожалуйста, введите пароль'),
  passConfir: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Повторите пароль')
    .required('Пароли не совподают'),
  email: Yup.string().email('Неккоретный email').required('Пожалуйста, введите почту'),
  site: Yup.string().url('Неверный адрес сайта'),
  age: Yup.number('Must be an integer')
    .typeError('Введите Ваш возраст')
    .min(18, 'Ваш возраст должнен быть от 18 до 65 лет')
    .max(65, 'Ваш возраст должнен быть от 18 до 65 лет')
    .required('Сколько Вам лет?'),
  skills: Yup.array(),
  acceptTerms: Yup.bool().required('Required').oneOf([true], 'Нужно Ваше согласие'),
});

export default validationSchema;
