import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { MessageType } from "../types";
import axios from "axios";

const initialState: MessageType = {
  author: "",
  message: "",
  date: "",
};

const ChatForm = () => {
  const [message, setMessage] = useState<MessageType>(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMessage((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const sendMessage = async () => {
    const url = "http://localhost:8000/messages";
    const data = {
      author: message.author,
      message: message.message,
    };
    try {
      await axios.post(url, data);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    setMessage((prevState) => {
      return { ...prevState, message: "" };
    });
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item xs>
          <TextField
            value={message.message}
            fullWidth
            multiline
            rows={3}
            id="message"
            label="Введите сообщение"
            name="message"
            onChange={onChange}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            value={message.author}
            fullWidth
            id="author"
            label="Введите имя"
            name="author"
            onChange={onChange}
            required
          />
        </Grid>
        <Grid item xs>
          <Button variant="contained" type="submit">
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatForm;
