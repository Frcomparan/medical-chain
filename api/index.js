const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routerApi = require('./routes');

const {
  logErros,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handle');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

routerApi(app);

app.use(logErros);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(8080);
