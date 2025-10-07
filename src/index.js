import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({ path: "../.env" });

// console.log("PORT:", process.env.PORT);
// console.log("MONGODB_URI:", process.env.MONGODB_URI);
// console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running on port",process.env.PORT)
    })
})
.catch((error) => {
    console.log("Error while connection db", error);
    
})