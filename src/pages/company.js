import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
// material
import { Button, Grid, Container, Stack, Typography, Avatar, Card } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Close from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
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

export default function Company(props) {
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
    const color = 'GRAY'
    return (
        <div>
            <Page title="Dashboard: company">
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Company
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item align="left" style={{ padding: 5 }} xs={12} sm={3} md={3}>
                            <Card
                                sx={{
                                    py: 2,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff',
                                    height: '228px'
                                }}
                            >
                                <img
                                    src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1420804.jpg"
                                    alt=""
                                    height="100%"
                                    width="100%"
                                    style={{ objectFit: 'contain' }}
                                />
                            </Card>
                        </Grid>

                        <Grid item align="left" style={{ padding: 5 }} xs={12} sm={9} md={9}>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff'
                                }}
                            >
                                <EditIcon sx={{position:'absolute', right:15,top:10 ,cursor:'pointer'}}/>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Company Name
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                        HSgarage
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        number
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                        +000000000
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        email
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                        sampll@gmail.com
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid item align="left" style={{ padding: 5 }} xs={12} sm={12} md={12}>
                            <Typography variant="h6" >
                                Billing Address
                            </Typography>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'left',
                                    bgcolor: '#fff'
                                }}
                            >
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                <Typography variant="body1" >
                                    Bill Address
                                </Typography>
                                <EditIcon sx={{position:'absolute', right:15,top:10 ,cursor:'pointer'}}/>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        </div>
    );
}
