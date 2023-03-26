const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const routerApi = require('./routes');
const {
  logErros,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handle');
const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

require('./utils/auth');

routerApi(app);

app.use(logErros);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
