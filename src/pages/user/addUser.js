import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Container, Typography, TextField, InputAdornment, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';
import ServiceURL from '../../constants/url';
import Iconify from '../../components/Iconify';


export default function FullScreenDialog(details) {
  const [update, setUpdate] = useState(details.updated);
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState(update ? details.data.userId : 2);
  const validSchema = Yup.object().shape({
    name: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Name is required'),
    Mobnum: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Mobile is required'),
    username: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Username is required'),
    password: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Password is required'),
  });

  const [alertMsg, setAlert] = useState();
  const formik = useFormik({
    initialValues: {
      name: update ? details.data.name : '',
      Mobnum: update ? details.data.mobile : '',
      username: update ? details.data.username : '',
      password: update ? details.data.password : '',
      userType: type
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      onAdd();
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const onAdd = () => {
    const requestdata =
    {
      "type": "SP_CALL",
      "requestId": update ? 2200003 : 2200001,
      "request": {
        "name": values.name,
        "mobile": values.Mobnum,
        "username": values.username,
        "password": values.password,
        "userType": type,
        "id": update ? details.data.aId : 0
      }
    }


    axios.post(ServiceURL, requestdata).then((res) => {
      if (res.data.errorCode === 1) {

        setAlert();
        if (update) {
          details.submit('')
        } else {
          details.submit(res.data.result);
        }

      } else {

        setAlert(res.data.errorMsg);
      }
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });


  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const alertTimeOut = () => {
    setTimeout(() => {
      setAlert();
    }, 2000);
  };
  const onclose = () => {
    formik.resetForm();
    details.onClose();
  };
  return (
    <div>
      <Dialog fullScreen open={details.open} onClose={details.onClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onclose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Customer
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">

          <Stack spacing={1} justifyContent="space-between" sx={{ my: 3 }}>
            <Typography variant="h4">USER DETAILS</Typography>
            <TextField
              fullWidth
              type="text"
              label="Name"
              variant="outlined"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              type="number"
              label="Mobile Number"
              variant="outlined"
              value={details.update ? details.data.name : ''}
              {...getFieldProps('Mobnum')}
              error={Boolean(touched.Mobnum && errors.Mobnum)}
              helperText={touched.Mobnum && errors.Mobnum}
            />

            { !update && <TextField
              fullWidth
              type="text"
              label="Username"
              variant="outlined"
              {...getFieldProps('username')}
              autoComplete
              error={Boolean(touched.username && errors.username || alertMsg)}
              helperText={touched.username && errors.username || alertMsg}
            /> }
            { !update && <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            /> }
            <Box>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={update ? details.data.userId : 2}
                onChange={(e) => { setType(e.target.value)}}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="ADMIN"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="STAFF"
                />
              </RadioGroup>
            </Box>
          </Stack>
        </Container>
      </Dialog>
    </div>
  );
}
