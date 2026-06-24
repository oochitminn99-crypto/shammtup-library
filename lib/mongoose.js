import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
    try {
         if (mongoose.connection.readyState >= 1) {
            console.log("Mongodb Already Connected");
            return;
         }

         await mongoose.connect(MONGODB_URI);
         console.log("Mongodb Connected Successfully")
    }  catch (err) {
        console.log("Mogodb Connection Error:", error)
    } 
}