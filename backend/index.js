import dotenv from "dotenv"
import app from "./src/app.js";
import DbConnection from "./src/db.js";

dotenv.config({
    path:"./env"
})

DbConnection()
.then(()=>{
    app.listen(3000,()=>{
        console.log("😎 app is listen at port 3000!")
    })
})
.catch((err)=>{
    console.log("Db error")
})



