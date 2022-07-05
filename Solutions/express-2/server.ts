var express = require("express");
var path = require("path");
import { Request, Response } from "express";


const app = express();
app.use(express.json());


interface User {
    username: string,
    password: string
    id: string
}
const users: User[] = [];


app.get("/users", (req: Request, res: Response) => {
    res.json(users);
});

app.post("/", (req: Request, res: Response) => {
    try {
        const userSearch = users.find(
            (user: User) => user.username === req.body.username
        );
        if (userSearch) {
            return res.status(400).send("Already exists");
        } else {
            const user = {
                username: req.body.username,
                password: req.body.password,
                id: req.body.username + "-" + `${Math.floor(Math.random() * 10)}`,
            };
            users.push(user);
            res.status(201).send("registration succeeded");
        }
    } catch {
        res.status(500).send("registration failed");
    }
});

app.get(`/users/:username/:password`, (req: Request, res: Response) => {
    console.log(req.params);
    try {
        const userSearch = users.find(
            (user: User) => user.username === req.params.username
        );
        if (userSearch) {
            return res.status(400).send("Already exists");
        } else {
            const user = {
                username: req.params.username,
                password: req.params.password,
                id: req.params.username + "-" + `${Math.floor(Math.random() * 10)}`,
            };
            users.push(user);
            res.status(201).send("registration succeeded");
        }
    } catch {
        res.status(500).send("registration failed");
    }
});

app.delete("/", (req: Request, res: Response) => {
    try {
        const userSearch = users.find(
            (user: User) => user.username === req.body.username
        );
        if (userSearch) {
            const index = users.indexOf(userSearch);
            users.splice(index, 1);
            return res.status(201).send("Deleted Successfully");
        } else {
            return res.status(400).send("User Not Found");
        }
    } catch {
        res.status(500).send("Delete proccess failed");
    }
});

app.get("/delete/:username", (req: Request, res: Response) => {
    try {
        const userSearch = users.find(
            (user: User) => user.username === req.params.username
        );
        if (userSearch) {
            const index = users.indexOf(userSearch);
            users.splice(index, 1);
            return res.status(201).send("Deleted Successfully");
        } else {
            return res.status(400).send("User Not Found");
        }
    } catch {
        res.status(500).send("Delete proccess failed");
    }
});

app.get("/update/:username/:new", (req: Request, res: Response) => {
    try {
        const userSearch = users.find(
            (user: User) => user.username === req.params.username
        );
        if (userSearch) {
            userSearch.username = req.params.new;
            return res.status(201).send("Updated Successfully");
        } else {
            return res.status(400).send("User Not Found");
        }
    } catch {
        res.status(500).send("Update proccess failed");
    }
});

app.get("/", (req: Request, res: Response) => {
    try {
        const userSearch = users.find(
            (user: User) => user.id === req.body.id
        );
        if (userSearch) {
            return res.status(201).send(`${userSearch.username}`);
        } else {
            return res.status(400).send("User Not Found");
        }
    } catch {
        res.status(500).send("Error");
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

