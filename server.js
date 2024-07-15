

import errorMiddleware from './middlewares/error_middleware.js';
import { app } from './src/app.js';
import connectDB from './src/db/db.js';


const PORT = process.env.PORT || 8000

app.use(errorMiddleware)
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT: ${PORT} `)
     })
     
}).catch(error => {
    console.log("mongo db connection failed!!");
})

