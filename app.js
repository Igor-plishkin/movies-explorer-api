const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/moviesdb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(auth);
app.use("/", require("./routes/routes"));

app.listen(PORT, () => {
  console.log("start server");
});
