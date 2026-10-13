import { Router } from "express";
import { User } from "../models/userauth.model.js";
import validator from "../utils/textValidator.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BlackList } from "../models/blackListedToken.model.js";
const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //check for texts valid?
        const valid = validator([email, password]);
        if (!valid) {
            return res.status(400).json({
                message: "All fields required"
            })
        }
        console.log(email, password)

        //check existance in record
        const found = await User.findOne({
            email
        })

        if (!found) {
            return res.status(401).json({
                message: "User Not Found!! Register Instead"
            })
        }

        //hash password

        const passwordValid = await bcrypt.compare(password, found.password);

        //check the hash

        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid Password!! Retry"
            })
        }

        // generate jwt 
        const payload = {
            email: found.email,
            username: found.username
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })

        //send the token

        res.cookie('token', token, {
            httpOnly: "true"
        });

        //send message

        return res.status(200).json({
            message: "logged in successfully!!",
            user: payload
        })
    } catch (error) {
        console.log('login error: ', error);

        res.status(500).json({
            message: "server Error!"
        });
    }

})



authRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //check for texts valid?
        const valid = validator([username, email, password]);
        if (!valid) {
            return res.status(400).json({
                message: "All fields required"
            })
        }
        console.log(email, password)

        //check existance in record
        const found = await User.findOne({
            email
        })

        if (found) {
            return res.status(401).json({
                message: "User Account Found Login Instead!!"
            })
        }

        //hash the password

        const passwordHash = await bcrypt.hash(password, 10);

        //insert The user into  the db

        const insertedUser = await User.insertOne({
            username,
            email,
            password: passwordHash
        })


        // generate jwt 
        const payload = {
            email: insertedUser.email,
            username: insertedUser.username
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })

        //send the token

        res.cookie('token', token, {
            httpOnly: "true"
        });

        //send message

        return res.status(200).json({
            message: "registered successfully!!",
            user:payload
        })
    }
    catch (error) {
        console.log('registration error: ', error);
        res.status(500).json({
            message: "server Error!"
        });
        console.log(error);
    }

})


authRouter.post('/logout', async (req, res) => {
    try {
        const tokenFromCookie = req.cookies?.token;
        if (tokenFromCookie) {
            await BlackList.insertOne({
                token: tokenFromCookie
            })
        }
        res.clearCookie('token', {
            httpOnly: true,
            path: '/'
        });
        return res.status(200).json({
            message: "logged out successfully!!"
        })
    } catch (error) {
        console.log('logout error: ', error);
        res.status(500).json({
            message: "server error"
        })
    }

})


authRouter.post('/me', async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                message: "User Not Authorised Re-Login!!"
            })
        }
        const validToken = jwt.verify(token, process.env.SECRET_KEY);

        if (!validToken) {
            return res.status(401).json({
                message: "User Not Authorised Re-Login!!"
            })
        }
        const blacklistedToken = await BlackList.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({
                message: "User Not Authorised Re-Login!!"
            })
        }
        console.log(validToken);

        return res.status(200).json({
            message: "fetched",
            user: validToken
        })

    } catch (error) {
        console.log('auth me: ', error);
        const status = error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"
            ? 401
            : 500;
        res.status(status).json({
            message: "server error"
        })
    }

})




export default authRouter;