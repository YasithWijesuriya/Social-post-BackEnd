import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./infrastructure/connect.js"; 
import galleryRouter from "./api/Gallery.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());   

// **Connect to MongoDB first**
await connectDB();  // <-- await this before registering routes

// Then register routes
app.use("/api/gallery", galleryRouter); 

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
