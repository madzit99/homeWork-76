import { Router } from "express";
import fileDb from "../fileDb";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  const queryDate = req.query.datetime as string;

  if (!queryDate) {
    const messages = await fileDb.getItems();
    return res.send(messages);
  }

  const date = new Date(queryDate);
  if (isNaN(date.getDate())) {
    return res.status(400).json({ error: "Неправильная дата" });
  }

  const messages = await fileDb.getItems({
    datetime: { $gt: date },
  });
  return res.send(messages);
});

messageRouter.post("/", async (req, res) => {
  const { author, message } = req.body;
  if (!author || !message || author.trim() === "" || message.trim() === "") {
    return res
      .status(400)
      .json({ error: "Автор и дата должны быть в запросе!" });
  }

  const messageObj = {
    author,
    message,
  };

  const newMessage = await fileDb.addItem(messageObj);
  return res.send(newMessage);
});

export default messageRouter;
