const express = require("express");
const { logRequest } = require("./middlewares/user");
const user = require("./routes/user");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.use(logRequest);

app.use(process.env.AUTH_PREFIX_URL, user);

app.get(`${process.env.AUTH_PREFIX_URL}/health`, (req, res) => {
  res.send({ message: "happy" });
});

app.listen(port, () => {
  console.log(`Connected to server at port ${port}`);
});
