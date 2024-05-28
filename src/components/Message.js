// src/components/Message.js
import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

function Message({ user, text, color1, color2 }) {
  return (
    <ListItem variant="body1" style={{ color1, fontWeight: 'bold' }}>
      {user}: &nbsp; <ListItemText style={{ color2, fontWeight: 'normal' }}>{text}</ListItemText>
    </ListItem>
  );
}

export default Message;
