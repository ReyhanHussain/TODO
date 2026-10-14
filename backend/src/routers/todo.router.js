import { Router } from "express";
import validator from "../utils/textValidator.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/userauth.model.js";
import { Todo } from "../models/todo.model.js";
const todoRouter = Router();

todoRouter.post('/add', async (req, res) => {
    try {
        const { title } = req.body;


        console.log(title, ' ');

        //take token
        const tokenFromCookie = req.cookies?.token;
        if (!tokenFromCookie) {
            return res.status(401).json({
                message: "Un Authorised!! Please Login/ReLogin"
            })
        }

        console.log('token @ todo router:', tokenFromCookie);

        //jwt payload decode

        const decoded = jwt.verify(tokenFromCookie, process.env.SECRET_KEY);

        console.log('decoded jwt @todo router: ', decoded);

        const user = req.user;

        if (!user) {
            return res.status(404).json({
                message: "User not Found/Deleted"
            })
        }

        //insert the todo;

        const todo = await Todo.insertOne({
            title, completed: false, edited: false, user: user._id,
        })


        const safeTodo = {
            _id: todo._id,
            title: todo.title,
            completed: todo.completed,
            edited: todo.edited,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
        };
        console.log('todo inserted @todoRouter: ', todo);

        return res.status(200).json({
            message: "Todo added!!",
            todo: safeTodo
        })
    } catch (error) {
        console.log('Todo insertion Error: ', error);
        res.status(500).json({
            message: "server Error!"
        });
    }
})



todoRouter.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        //check id
        if (!id) {
            return res.status(401).json({
                message: "todo deletion Failed!!"
            })
        }



        //attach user;
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                message: "UnAuthorized Please Relogin"
            })
        }

        //find the todo
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo Not Found"
            })
        }

        return res.status(200).json({
            message: "Todo Succesfully Deleted!!"
        })
    } catch (error) {
        console.log('Todo Delition Error!!: ', error);
        res.status(500).json({
            message: "server Error!"
        });
    }
})

todoRouter.post('/clear', async (req, res) => {
    try {

        //attach user;
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                message: "UnAuthorized Please Relogin"
            })
        }

        //find the todo
        const todo = await Todo.deleteMany({
            "user": user.id,
        });

        if (!todo) {
            return res.status(404).json({
                message: "error @all clear"
            })
        }

        return res.status(200).json({
            message: "All Todo Succesfully Deleted!!"
        })
    } catch (error) {
        console.log('ALL TODO Delition Error!!: ', error);
        res.status(500).json({
            message: "server Error!"
        });
    }
})


todoRouter.post('/edit', async (req, res) => {
    try {
        const { id, title, completed } = req.body;

        //check id
        if (!id) {
            return res.status(401).json({
                message: "todo Edit faliure!!"
            })
        }

        //attach user;
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                message: "UnAuthorized Please Relogin"
            })
        }

        //update the todo
        const todo = await Todo.findOneAndUpdate({
            _id: id
        },
            {
                $set: {
                    title,
                    completed,
                    edited: true
                }
            },
            {
                returnDocument: "after",
                runValidators: true,

            })

        if (!todo) {
            return res.status(404).json({
                message: "Todo Not Found"
            })
        }

        return res.status(200).json({
            message: "Todo Succesfully Edited!!"
        })
    } catch (error) {
        console.log('Todo Updation Error!!: ', error);
        res.status(500).json({
            message: "server Error!"
        });
    }
})


todoRouter.post('/get', async (req, res) => {
    try {
        //attach user;
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                message: "UnAuthorized Please Relogin"
            })
        }

        //get all todos
        const todo = await Todo.find({
            user: user._id
        }).select(" -user -__v");

        console.log('all todo found of user', todo)

        if (!todo) {
            return res.status(404).json({
                message: "Empty Create new todos"
            })
        }

        return res.status(200).json({
            message: "todos fetched!!",
            todo,
        })
    } catch (error) {
        console.log('get Todo Error!!: ', error);
        res.status(500).json({
            message: "server Error!"
        });
    }
})


export default todoRouter;