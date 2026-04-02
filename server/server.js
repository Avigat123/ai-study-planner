import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import planRoutes from "./routes/planRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/plans", planRoutes);
app.use("/auth", authRoutes);

// test route
app.get("/", (req, res) => {
    res.send("AI Study Planner Backend Running ");
});

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});