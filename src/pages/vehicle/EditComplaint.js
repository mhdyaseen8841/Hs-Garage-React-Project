import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Container, Typography, TextField, Checkbox, Alert, ownerDocument } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ServiceURL from '../../constants/url';

import Camera from '../../utils/Camera';


export default function AddComplaint(details) {
   
  const [update, setUpdate] = useState(details.updated);
  const [imagedata, setImageData] = useState(details.data.image);
  const [complaints,setComplaints]=useState([])
  const [imgstatus, setImgStatus] = useState(false)

  const validSchema = Yup.object().shape({
    Complaint: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Complaint is required'),
    Problem: Yup.string().matches(/^\S/, 'Whitespace is not allowed'),
  });

  const [alertMsg, setAlert] = useState();
  const formik = useFormik({
    initialValues: {
      Complaint: update ? details.data.complaint : '',
      Problem: update ? details.data.problem : ''
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      console.log("submited")
     
      onAdd()
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;


 

  const onAdd = () => {
    console.log("hlooooooooooooooooooo");
    
    const requestdata = 
    {
        "type" : "SP_CALL",
     "requestId" : 1900003,
         request: {
         complaint : values.Complaint,
         problem: values.Problem,
      image: !imagedata ? '' :imagedata,
         "cmdId" :details.data.cdId
             }
  }
 
console.log(requestdata);
      
      axios.post(ServiceURL,requestdata).then((res) => {
      
        
//         if(res.data.errorCode===1)
// {
//   console.log(res);
//   setAlert();
//   details.submit(res.data.result);
// }       else{
//   console.log(res)
//   console.log(res.data.errorMsg);
//   setAlert(res.data.errorMsg);
// }
setAlert();
console.log(res.data);
  details.submit(res.data);
      }).catch(() => {
          console.log('No internet connection found. App is running in offline mode.');
        });
  };

  const handleCallback = (imgData) => {
    setImageData(imgData);
    setImgStatus(true);
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
    <Container >
      <Dialog fullScreen open={details.open} onClose={details.onClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onclose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add New Complaint
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>{handleSubmit()}}>
              {details.button} COMPLAINT
            </Button>
          </Toolbar>
        </AppBar>
        <Container >
        <Typography variant="h4">COMPLAINT DETAILS</Typography>
          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ my: 5 }}>
            <TextField
              fullWidth
              type="text"
              label="Complaint"
              variant="outlined"
              value={details.update ? details.data.name : ''}
              {...getFieldProps('Complaint')}
              error={Boolean(touched.Complaint && errors.Complaint)}
              helperText={touched.Complaint && errors.Complaint}
            />
            {}
            <TextField
              fullWidth
              type="text"
              label="Problem"
              variant="outlined"
              {...getFieldProps('Problem')}
              error={Boolean(touched.Problem && errors.Problem)}
              helperText={touched.Problem && errors.Problem}
            />
           <Stack direction="row" alignItems="center">
              <Camera callback={handleCallback} status={imgstatus} /> 
           </Stack>
          </Stack>
        </Container>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        
      <TableCell >{imagedata ? <img src={`${imagedata}`} style={{width: 100, height: 100, objectFit: 'contain'}} alt="no data" /> : 'no image'}</TableCell>
      </Table>
    </TableContainer>
      </Dialog>
  </Container>
  );
}
