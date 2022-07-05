const express = require("express");
const cookieParser = require("cookie-parser");
const fetch = require("cross-fetch");
const axios = require("axios");

const app = express();
app.use(cookieParser());
const port = 3001;

app.get("/", (req, res) => {
  console.log("headers: ", req.headers);
  console.log("cookie: ", req.headers.cookie);
  //   res.cookie("cookie-from-server", "hi!");
  res.cookie("cyber4s-is=amazing");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
