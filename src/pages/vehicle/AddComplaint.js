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
  const [imagedata, setImageData] = useState('');
  const [complaints,setComplaints]=useState([])
  const [imgstatus, setImgStatus] = useState(false)

  const validSchema = Yup.object().shape({
    Complaint: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Complaint is required'),
    Problem: Yup.string().matches(/^\S/, 'Whitespace is not allowed'),
  });

  const [alertMsg, setAlert] = useState();
  const formik = useFormik({
    initialValues: {
      Complaint: update ? details.data.Complaint : '',
      Problem: update ? details.data.Problem : ''
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      console.log("submited")
      handleAddNew();
      formik.resetForm();
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;


  const handleAddNew = ()=>{
    console.log("hloooooooooooooooooo");
   console.log(imagedata);
   setImgStatus(false);
    setComplaints([...complaints, {
      complaint: values.Complaint,
      problem: values.Problem,
      image: !imagedata ? '' :imagedata
   }]);
   
console.log(values.Complaint);
console.log(values.Problem);
setImageData('');
console.log(complaints);

  }

  const onAdd = () => {
    console.log("hlooooooooooooooooooo");
    console.log(localStorage.getItem('vId'));

    setComplaints([...complaints, {
      complaint: values.Complaint,
      problem: values.Problem,
      image: !imagedata ? '' :imagedata
   }]);
   
   console.log(complaints);
    const requestdata = 
    {
      "type" : "SP_CALL",
   "requestId" : 1800001,
       "request": {
        "uId" : localStorage.getItem('loginId'),
        "vId" : localStorage.getItem('vId'),
        "complaints" : complaints
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
            <Button autoFocus color="inherit" onClick={()=>{onAdd();}}>
              {details.button} COMPLAINT
            </Button>
          </Toolbar>
        </AppBar>
        <Container  >
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
              <Button style={{width:'50px'}} onClick={()=>{handleSubmit()}} variant="outlined">ADD NEW</Button>
           </Stack>
          </Stack>
        </Container>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell>Complaint</TableCell>
            <TableCell>Problem</TableCell>
            <TableCell>Image</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {complaints.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.complaint}
              </TableCell>
              <TableCell >{row.problem}</TableCell>
              <TableCell >{row.image ? <img src={`${row.image}`} style={{width: 100, height: 100, objectFit: 'contain'}} alt="no data" /> : 'no image'}</TableCell>
              <TableCell/>
            </TableRow>
          )
        )}
        </TableBody>
      </Table>
    </TableContainer>
      </Dialog>
  </Container>
  );
}
