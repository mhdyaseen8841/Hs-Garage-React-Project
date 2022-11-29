import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
// material
import { Button, Grid, Container, Stack, Typography, Avatar, Card, DialogTitle, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Close from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import requestPost from '../serviceWorker';
// components
import Page from '../components/Page';
import DetailsChange from '../sections/company/details';
import AddressChange from '../sections/company/address';
import BankChange from '../sections/company/bank';

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
    const [edit1, setEdit1] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [edit3, setEdit3] = useState(false);
    const [datas, setdatas] = useState({});
    const [proImg, setImg] = useState('https://microredsolutions.in/assets/images/mr_logo.png');
    const profileClick = () => {
        setOpen(true);
    };

    useEffect(() => {
        request();
      }, [])
    
      const request = ()=>{
        const requestData = {
            "type": "SP_CALL",
            "requestId": 2400005,
            "request": {}
          }
          requestPost(requestData).then((res) => {
            if (res.data.errorCode === 1) {
              setdatas(res.data.result);
              if(res.data.result.logo !== ""){
                setImg(res.data.result.logo);
              }
            }
          })
      }
    const handleClose = () => {
        setOpen(false);
        setEdit1(false);
        setEdit2(false);
        setEdit3(false);
    };
    const handleListItemClick = (tag) => {
        if (tag) {
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
            maxWidthOrHeight: 1500,
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
        const reader = new FileReader();
       reader.onloadend = function() {
         const requestData = {
            "type": "SP_CALL",
            "requestId": 2400004,
            "request": {
                logo: reader.result
            }
          }
          requestPost(requestData).then((res) => {
            if (res.data.errorCode === 1) {
              setdatas(res.data.result);
              request();
              setOpen(false);
            }
          })
         }
         reader.readAsDataURL(file);
    };
    const handleChange = (e) => {
        fileCompress(e.target.files[0]);
    };
    const callback1 = () => {
        setEdit1(false);
        request();
    };
    const callback2 = () => {
        setEdit2(false);
        request();
    };
    return (
        <div>
            <Page title="Dashboard: company">
                <Dialog open={edit1} fullWidth>
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
                    <DialogTitle>Change Details</DialogTitle>
                    <DialogContent>
                        <DetailsChange callback={callback1} data={datas} />
                    </DialogContent>
                </Dialog>

                <Dialog open={edit2} fullWidth>
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
                    <DialogTitle>Change Address</DialogTitle>
                    <DialogContent>
                        <AddressChange callback={callback2} data={datas} />
                    </DialogContent>
                </Dialog>

                <Dialog open={edit3} fullWidth>
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
                    <DialogTitle>Change Details</DialogTitle>
                    <DialogContent>
                        <BankChange callback={callback1} data={datas} />
                    </DialogContent>
                </Dialog>
                <Dialog open={view}>
                    <ImageStyle src={proImg} alt='' />
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
                        onClick={viewHandleClose}
                    />
                </Dialog>
                <Dialog onClose={handleClose} open={open}>
                    <List sx={{ pt: 0 }}>
                        <ListItem button onClick={() => handleListItemClick(1)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#112833', color: '#fff' }}>
                                    <AccountBoxIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="View Logo" />
                        </ListItem>
                    </List>
                    <List sx={{ pt: 0 }}>
                        <ListItem button onClick={() => handleListItemClick(0)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#112833', color: '#fff' }}>
                                    <EditIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Change Logo" />
                            <input
                                id="imageselect"
                                type="file"
                                accept="image/*"
                                multiple={false}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                        </ListItem>
                    </List>
                </Dialog>
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Company
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item align="left" xs={12} sm={3} md={3}>
                            <Card
                                sx={{
                                    py: 2,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff',
                                    height: '228px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => { setOpen(true) }}
                            >
                                <img
                                    src={proImg}
                                    alt=""
                                    height="100%"
                                    width="100%"
                                    style={{ objectFit: 'contain' }}
                                />
                            </Card>
                        </Grid>

                        <Grid item align="left" xs={12} sm={9} md={9}>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff'
                                }}
                            >
                                <EditIcon sx={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }} onClick={() => { setEdit1(true) }} />
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Company Name
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.name}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        number
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.mobile}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        email
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       {datas && datas.email}
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid item align="left" xs={12} sm={6} md={6}>
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
                                <EditIcon sx={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }} onClick={() => { setEdit2(true) }} />
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Street Address
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.address}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        city
                                    </Typography>.
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.city}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        VAT
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.tax}
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid item align="left" xs={12} sm={6} md={6}>
                            <Typography variant="h6" >
                                Bank Details
                            </Typography>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'left',
                                    bgcolor: '#fff'
                                }}
                            >
                                <EditIcon sx={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }} onClick={() => { setEdit3(true) }} />
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Account No.
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.accnumber}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        IFSC
                                    </Typography>.
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.ifsc}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Bank
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.bank}
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        </div>
    );
}
