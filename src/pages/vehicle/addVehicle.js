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
  const [yearlimit,setyearlimit] = useState(false);
  const [update, setUpdate] = useState(details.updated);
  const validSchema = Yup.object().shape({
    VehicleNum: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Number is required'),
    VehicleCompany: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Company name is required'),
    ModelName: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Model name is required'),
    Year: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Year is required'),
  });

  const [alertMsg, setAlert] = useState();
  const formik = useFormik({
    initialValues: {
      VehicleNum: update ? details.data.number : '',
      VehicleCompany: update ? details.data.Company : '',
      ModelName: update ? details.data.model : '',
      Year: update ? details.data.year : '',
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
    const requestdata = 
    {
      
        "type" : "SP_CALL",
     "requestId" : update ? 1700003 : 1700001,
         request: {
          "cId" : localStorage.getItem('cId'),
 "company" : values.VehicleCompany,
 "vNumber" : values.VehicleNum,
 "vModel" : values.ModelName,
 "vYear" : values.Year,
 "vId" : update ? details.data.vId : 0
        }
  
 
    }
      
      axios.post(ServiceURL,requestdata).then((res) => {
        if(res.data.errorCode===1)
{
  setAlert();
  details.onClose();
  details.submit(res.data.result);
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
              Add Vehicle
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
      
          <Stack spacing={1} justifyContent="space-between" sx={{ my: 3 }}>
            <Typography variant="h4">VEHICLE DETAILS</Typography>
            
            <TextField
              fullWidth
              type="text"
              label="Vehicle Number"
              variant="outlined"
              value={details.update ? details.data.name : ''}
              {...getFieldProps('VehicleNum')}
              error={Boolean(touched.VehicleNum && errors.VehicleNum || alertMsg)}
              helperText={touched.VehicleNum && errors.VehicleNum || alertMsg}
            />
            <TextField
              fullWidth
              type="text"
              label="Vehicle Company"
              variant="outlined"
              {...getFieldProps('VehicleCompany')}
              error={Boolean(touched.VehicleCompany && errors.VehicleCompany)}
              helperText={touched.VehicleCompany && errors.VehicleCompany}
            />
            <TextField
              fullWidth
              type="text"
              label="Model Name"
              variant="outlined"
              {...getFieldProps('ModelName')}
              error={Boolean(touched.ModelName && errors.ModelName)}
              helperText={touched.ModelName && errors.ModelName}
            />
            <TextField
              fullWidth
              type="number"
              maxlength={4}
              label="Year"
              variant="outlined"
              onInput = {(e) =>{

                e.target.value = Math.max(0, parseInt(e.target.value,10) ).toString().slice(0,4)
                const cyear = new Date().getFullYear()
                if(cyear < parseInt(e.target.value,10) ){
                  setyearlimit(true);
                }
                else{
                  setyearlimit(false);
                }
               }}
              {...getFieldProps('Year')}
              error={Boolean(touched.Year && errors.Year)|| yearlimit}
              helperText={touched.Year && errors.Year || yearlimit && "enter correct Model Year"}
            />
          </Stack>
        </Container>
      </Dialog>
    </div>
  );
}
