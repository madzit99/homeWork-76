import React from "react";
import { MessageType } from "../types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

const Message: React.FC<MessageType> = ({ author, message, datetime }) => {
  return (
    <Grid item xs sx={{ width: "100%" }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          title={
            <Box
              component="div"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h4">{author}</Typography>
              <Typography variant="h5">{datetime}</Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography variant="h6">{message}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Message;
