import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
// material
import { Button, Grid, Container, Stack, Typography, Avatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import Close from '@mui/icons-material/Close';
import { LockReset } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import PasswordChange from '../sections/settingsPop/passwordChange';
import ServiceURL from '../constants/url';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function Settings() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const passChangeClick = () => {
    setOpen(true);
  };
  const callback = () => {
    setOpen(false);
  };
  return (
    <div>
      <Page title="Dashboard: Settings">
        <Dialog open={open} fullWidth>
          <Close
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              cursor: 'pointer',
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '100%'
            }}
            onClick={handleClose}
          />
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <PasswordChange callback={callback} />
          </DialogContent>
        </Dialog>
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Settings
          </Typography>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={passChangeClick}>
                    <ListItemIcon>
                      <LockReset />
                    </ListItemIcon>
                    <ListItemText primary="Change password" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Contact" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Container>
      </Page>
    </div>
  );
}
