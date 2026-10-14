import jwt from 'jsonwebtoken';
import { User } from '../models/userauth.model.js';

async function authMe(req, res, next) {

    try {
        const tokenFromCookie = req.cookies?.token;
        if (!tokenFromCookie) {
            return res.status(401).json({
                message: "Un Authorised!! Please Login/ReLogin"
            })
        }

        //jwt payload decode

        const decoded = jwt.verify(tokenFromCookie, process.env.SECRET_KEY);
        const { email, username } = decoded;

        //search the email;
        const user = await User.findOne({ email })
            .select("username email _id");

        if (!user) {
            return res.status(404).json({
                message: "User not Found/Deleted"
            })
        }

        //put user 

        req.user = user;
        console.log('authorization approved @auth middelware',req.user)
        //next move

        next();

    } catch (error) {
        return res.status(500).json({
            message: "unable to Authenticate!!! server error!",
        })
    }
}

export default authMe;