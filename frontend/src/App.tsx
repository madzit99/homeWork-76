import { Container, Grid } from "@mui/material";
import ChatForm from "./Components/ChatForm";
import Messages from "./Components/Messages";
import { useEffect, useState } from "react";
import { MessageType } from "./types";
import axios from "axios";

const App = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  let lastDate: string;

  const fetchMessages = async () => {
    const response = await axios.get("http://localhost:8000/messages");
    const data = response.data;
    setMessages(data);
    lastDate = data[data.length - 1].date;
  };

  const fetchLastMessages = async () => {
    const response = await axios.get(
      "http://localhost:8000/messages?datetime=" + lastDate
    );
    const newMessages: MessageType[] = response.data;
    if (newMessages.length > 0) {
      setMessages((prevState) => [...prevState, ...newMessages]);
      lastDate = newMessages[newMessages.length - 1].date;
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(() => {
      void fetchLastMessages();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container direction="column">
        <Grid item xs={9}>
          <Messages messages={messages} />
        </Grid>
        <Grid item xs={3}>
          <ChatForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
