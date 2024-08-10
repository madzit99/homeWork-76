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

import dayjs from "dayjs";

const Message: React.FC<MessageType> = ({ author, message, date }) => {
  const datetime = dayjs(date, { format: "YYYY-MM-DDTHH:mm:ss.SSSZ" });
  const currentDate = dayjs();
  const formattedDate =
    datetime.year() !== currentDate.year()
      ? datetime.format("YYYY.MM.DD HH:mm")
      : datetime.isSame(currentDate, "day")
      ? datetime.format("HH:mm")
      : datetime.isSame(currentDate.subtract(1, "day"), "day")
      ? "Yesterday"
      : datetime.format("DD.MM HH:mm");

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
              <Typography variant="h5">{formattedDate}</Typography>
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
