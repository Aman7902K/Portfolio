import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./src/Routes/Projects.js";
import connectDB from "../server/src/db/index.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: [
    "http://localhost:5173",
    "https://localhost:5174",
    "https://portfolio-1-backend-osnn.onrender.com"
] }));
app.use(express.json());

app.get("/healthz", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/", (req, res) => res.status(200).send("API is running"));
app.use("/api/projects", router);

connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})