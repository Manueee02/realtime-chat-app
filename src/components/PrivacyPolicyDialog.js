import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography
} from '@mui/material';

const PrivacyPolicyDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ backgroundColor: "#161B22", color: "#D9EAE6" }}>Privacy Policy</DialogTitle>
      <DialogContent style={{ padding: '1rem', backgroundColor: "#161B22", color: "#D9EAE6" }}>
        <Typography variant="body1" paragraph>
          This Privacy Policy explains how we collect, use, and share your personal information when you use our real-time chat application.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Information We Collect:</strong> We collect information you provide directly to us, such as when you create or modify your account, use the chat, or communicate with us.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>How We Use Information:</strong> We use the information we collect to provide, maintain, and improve our services, and to communicate with you.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Sharing Information:</strong> We do not share your personal information with third parties except as described in this Privacy Policy or with your consent.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Your Choices:</strong> You have the right to access, update, and delete your personal information. You can also opt out of receiving promotional communications from us.
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about this Privacy Policy, please contact us at manuel02.sviluppo@gmail.com 
        </Typography>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#161B22" }}>
        <Button onClick={handleClose} color="success">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;
