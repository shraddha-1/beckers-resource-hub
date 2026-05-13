import express from "express";
import cors from "cors";
import assetsRouter from "./routes/assets";

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://beckers-resource-hub.vercel.app/',
  ]
}))

app.use(express.json());

app.use("/assets", assetsRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
);

export default app;