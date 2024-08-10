import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import { Message, MessageWithoutId } from "./type";

const filename = "./db.json";

let data: Message[] = [];

type Filter = {
  datetime?: {
    $gt: Date;
  };
};

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);

      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  async getItems(filter?: Filter) {
    if (!filter || !filter.datetime) {
      return data.slice(0, 30);
    }

    const filteredMessages = data.filter((message) => {
      const messageDate = new Date(message.date);
      return messageDate > filter.datetime!.$gt;
    });
    
    return filteredMessages.slice(0, 30);
  },

  async addItem(item: MessageWithoutId) {
    const message: Message = {
      ...item,
      id: randomUUID(),
      date: new Date().toISOString(),
    };

    data.push(message);
    await this.save();
    return message;
  },

  async save() {
    return fs.writeFile(filename, JSON.stringify(data));
  },
};

export default fileDb;
