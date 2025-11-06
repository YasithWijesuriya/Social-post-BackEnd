import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./infrastructure/connect.js"; 
import galleryRouter from "./api/Gallery.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: [
    "http://localhost:5173",  
    "https://social-post-cit305.yasithruchiranga95.workers.dev/" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

await connectDB();

app.use("/api/gallery", galleryRouter);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
