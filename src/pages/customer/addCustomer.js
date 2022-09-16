import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Container, Typography, TextField, Checkbox, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';
import ServiceURL from '../../constants/url';


export default function FullScreenDialog(details) {
  console.log(details.data);
  const [update, setUpdate] = useState(details.updated);
  const validSchema = Yup.object().shape({
    CustomerName: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Name is required'),
    Mobnum: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Mobnum is required'),
    Email: Yup.string().email("Invalid Format").matches(/^\S/, 'Whitespace is not allowed'),
    Address: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Address is required'),
  });

  const [alertMsg, setAlert] = useState();
  const formik = useFormik({
    initialValues: {
      CustomerName: update ? details.data.name :'',
      Mobnum: update ? details.data.mobile : '',
      Email: update ? details.data.email : '',
      Address: update ? details.data.address : '',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
     
      onAdd();
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  // useEffect(() => {
  //   axios.get(`${ServiceURL}getType.php`).then((res) => {
  //     setTypeData(res.data);
  //     console.log(type);
  //   });
  //   axios.get(`${ServiceURL}getColor.php`).then((res) => {
  //     setcolour(res.data);
  //   });
  //   console.log(details.updated);
  // }, []);

  

  const onAdd = () => {
    console.log(values);
   console.log(update);
    const requestdata = 
    {
      "type":"SP_CALL",
      "requestId": update ? 1600003 : 1600001 ,
      "request":{
        "name":values.CustomerName,
        "mobile" : values.Mobnum,
    "email" : values.Email,
        "place" :values.Address,
  "id" : update ? details.data.cId : 0
      }
    }

    console.log(requestdata);
      
      axios.post(ServiceURL,requestdata).then((res) => {
        if(res.data.errorCode===1)
{
  
  setAlert();
  if(update){
    details.submit('') 
  }else
  {
    details.submit(res.data.result);
  }
 
}       else{
 
  setAlert(res.data.errorMsg);
}
      }).catch(() => {
          console.log('No internet connection found. App is running in offline mode.');
        });
    
   
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
            <Typography variant="h4">CUSTOMER DETAILS</Typography>
            
            <TextField
           
              fullWidth
              type="text"
              label="Mobile Number"
              variant="outlined"
              value={details.update ? details.data.name : ''}
              {...getFieldProps('Mobnum')}
              error={Boolean(touched.Mobnum && errors.Mobnum || alertMsg)}
              helperText={touched.Mobnum && errors.Mobnum || alertMsg}
            />
            {}
            <TextField
              fullWidth
              type="text"
              label="Customer Name"
              variant="outlined"
              {...getFieldProps('CustomerName')}
              error={Boolean(touched.CustomerName && errors.CustomerName)}
              helperText={touched.CustomerName && errors.CustomerName}
            />
            <TextField
              fullWidth
              type="text"
              label="Email"
              variant="outlined"
              {...getFieldProps('Email')}
              error={Boolean(touched.Email && errors.Email)}
              helperText={touched.Email && errors.Email}
            />
            <TextField
              fullWidth
              type="text"
              label="Address"
              variant="outlined"
              {...getFieldProps('Address')}
              error={Boolean(touched.Address && errors.Address)}
              helperText={touched.Address && errors.Address}
            />
           
            
          </Stack>
        </Container>
      </Dialog>
    </div>
  );
}
