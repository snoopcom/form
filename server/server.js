// подключаем express
const express = require('express');
// подключаем cors
const cors = require('cors');
// подключаем bodyParser
const bodyParser = require('body-parser');

// создали пустой массив для хранения пользователей
let users = [];

// создаем объект приложения
const app = express();

// начинаем прослушивать подключения на 3010 порту
app.listen(3010);

// extended: true означает, что req.body объект будет содержать значения любого типа, а не только строки.
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(bodyParser.json());

// определяем обработчик для маршрута '/sign-up'
app.post('/sign-up', (request, response) => {
  const {
    name, password, email, site, age, skills,
  } = request.body;
  if (users.findIndex((user) => email === user.email) > -1) {
    response.status(400);
    response.send('Пользователь с такой почтой уже существует');
  }
  users = [
    {
      name,
      password,
      email,
      site,
      age,
      skills,
    },
  ];
  response.status(200);
  response.send('Вы успешно зарегистрированы');
});