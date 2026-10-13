import dotenv, { config } from 'dotenv';
import app from './app.js';
import connectDb from './config/db.js';
dotenv.config()
async function startServer() {
    try {
        await connectDb();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log('server started @port', PORT));

    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();