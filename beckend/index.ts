import express from "express";
import cors from "cors";
import messageRouter from "./routers/message";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/messages", messageRouter);


const run = async () => {
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
