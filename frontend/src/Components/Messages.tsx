import React from "react";
import Message from "./Message";
import { MessageType } from "../types";
import { Grid } from "@mui/material";

interface Props {
  messages: MessageType[];
}

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <Grid container direction='column'spacing={2} sx={{mb: 3}} >
      {messages.map((messageItem) => (
        <Message
          key={Math.random()}
          author={messageItem.author}
          message={messageItem.message}
          datetime={messageItem.datetime}
        />
      ))}
    </Grid>
  );
};

export default Messages;
