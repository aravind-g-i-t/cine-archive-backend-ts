import app from './expressApp.js';
import http from 'http'
import dotenv from 'dotenv';
dotenv.config()




const PORT=process.env.PORT || 5000;

async function startServer() {
    try {
        const server=http.createServer(app);

        server.listen(PORT, ()=>{
            console.log(`Server running at port ${PORT}`)
        })

    } catch  {
        console.error("Server startup failed");
        process.exit(1)
    }
}

startServer()
