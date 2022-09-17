import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
// material
import { Button, Grid, Container, Stack, Typography, Avatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Close from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import ServiceURL from '../constants/url';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------
const ImageStyle = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  justifyContent: 'center'
}));

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [proImg, setImg] = useState(localStorage.getItem('avatar'));
  const profileClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleListItemClick = (tag) => {
    if (tag) {
      console.log('viewed Profile Picture');
      setOpen(false);
      setView(true);
    } else {
      document.getElementById('imageselect').click();
    }
  };
  const viewHandleClose = () => {
    setView(false);
  };
  const fileCompress = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(file, options);
      await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  };
  const uploadToServer = (file) => {
    console.log()
  };
  const handleChange = (e) => {
    fileCompress(e.target.files[0]);
  };
  return (
    <div>
      <Page title="Dashboard: Profile">
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Profile
          </Typography>
          <Grid container direction="column" sx={{ justifyContent: 'space-between' }}>
            <Grid item align="center">
              <Avatar
                src={proImg}
                alt={localStorage.getItem('name')}
                sx={{ height: 150, width: 150, boxShadow: 4, cursor: 'pointer' }}
                onClick={profileClick}
              />
              <Typography variant="h5" style={{ color: '#555', mb: 5 }}>
                {localStorage.getItem('name')}
              </Typography>
            </Grid>
            <Grid item align="center" style={{ padding: 3 }}>
              <Typography variant="h6" style={{ color: '#555', mb: 5 }}>
                {localStorage.getItem('email')}
              </Typography>
              <Typography variant="h6" style={{ color: '#555', mb: 5 }}>
                {localStorage.getItem('job')}
              </Typography>
              <Typography variant="h6" style={{ color: '#555', mb: 5 }}>
                {localStorage.getItem('descib')}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
}
