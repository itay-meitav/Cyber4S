const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const users = [];

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

app.get(["/dashboard", "/"], isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views/dashboard.html"));
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/", async (req, res) => {
  try {
    if (req.body.action === "register") {
      const userSearch = users.find(
        (user) => user.username === req.body.username
      );
      if (userSearch) {
        return res.status(400).send({ message: "Already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
          username: req.body.username,
          password: hashedPassword,
          token: req.body.username,
        };
        users.push(user);
        res.status(201).send({ message: "registration succeeded" });
      }
    }
  } catch {
    res.status(500).send({ message: "registration failed" });
  }
  try {
    if (req.body.action === "login") {
      const user = users.find((user) => user.username === req.body.username);
      if (user == null) {
        return res.status(400).send({ message: "Cannot find user" });
      }
      res.cookie("token", user.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
        secure: true,
      });
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.redirect("/");
      } else {
        res.send({ message: "Not Allowed" });
      }
    }
  } catch {
    res.status(500).send({ message: "Not Allowed" });
  }
  if (req.body.action === "logout") {
    res.cookie("token", "", {
      expires: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    });
    res.send({ message: "Logged out" });
  }
});

function isAuthenticated(req, res, next) {
  let token = req.cookies.token;
  let user = users.find((u) => u.token == token);
  if (user) {
    next();
  } else {
    res.redirect("/login");
    // res.send({ message: "Cookies not found, please fill the fields" });
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
