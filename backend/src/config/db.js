import mongoose from "mongoose";


async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected!!')
    } catch (error) {
        console.log('error at db connection: ', error);
    }
}


export default connectDb;