require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  centralizedErrorHandling,
} = require('./middlewares/centralizedErrorHandling');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./answersServer/customsErrors/NotFoundError');

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(requestLogger);
const options = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://mymesto.nomoredomains.monster',
    'https://mymesto.nomoredomains.monster',
  ],
  methods: ['GET', 'PUT', 'HEAD', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

app.use('*', cors(options));

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/w{0,3}?[a-z0-9-]{1,}\..+#?/i),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', auth, (req, res, next) => next(new NotFoundError('По указанному url ничего нет.')));

app.listen(PORT, () => {
  console.log('Сервер работает');
});

console.log(process.env.NODE_ENV);

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandling);
