// src/components/Message.js
import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

function Message({ user, text }) {
  return (
    <ListItem>
      <ListItemText primary={`${user}:`} secondary={text} />
    </ListItem>
  );
}

export default Message;
