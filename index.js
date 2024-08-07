import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRouter from "./routes/User.js";
import ProductRoutes from "./routes/Products.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//error handel
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello",
  });
});

app.use("/api/user/", UserRouter);
app.use("/api/products/", ProductRoutes);

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to MONGO DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

connectDB();
app.listen(8000, () => console.log("Server started on port 8000"));
