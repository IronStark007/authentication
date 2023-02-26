const express = require("express");
const { logRequest } = require("./middlewares/user");
const user = require("./routes/user");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.use(logRequest);

app.use(process.env.AUTH_PREFIX_URL, user);

app.use(function errorHandler(err, req, res, next) {
  res.status(500).send({ error: err.stack });
});

app.listen(port, () => {
  console.log(`Connected to server at port ${port}`);
});
