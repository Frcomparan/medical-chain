const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routerApi = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

routerApi(app);

app.listen(8080);
