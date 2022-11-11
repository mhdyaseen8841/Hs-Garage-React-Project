import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { Stack, TextField, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ServiceURL from '../../constants/url';

export default function PasswordChange(props) {
  const validSchema = Yup.object().shape({
    ItemName: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Name is required'),
    ItemPrice: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Price is required')
    // currentP: Yup.string()
    //   .matches(/^\S/, 'Whitespace is not allowed')
    //   .required('Enter current password'),
    // newP: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Enter new password'),
    // repeatNewP: Yup.string()
    //   .matches(/^\S/, 'Whitespace is not allowed')
    //   .required('Enter repeat new password')
    //   .oneOf([Yup.ref('newP'), null], 'Passwords must match')
  });
  const [alertState, setAlertState] = useState('success');
  const [alertMsg, setAlertMsg] = useState();
  const [snackbarState, setSnackstate] = useState(false);
  const formik = useFormik({
    initialValues: {
        ItemName:'',
        ItemPrice:'',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
        
      const requestOptions = {
        "type" : "SP_CALL",
     "requestId" : 2500002,
         "request": {
         "itemName" : values.ItemName,
         "rate" : values.ItemPrice,
 }
  }
 
      axios.post(ServiceURL, requestOptions).then((res) => {
        if (res.data.errorCode === 1) {
          setAlertState('success');
          setAlertMsg(res.data.errorMsg);
          setSnackstate(true);
        //   setTimeout(() => {
        //     setSnackstate(false);
        //     props.callback();
        //   }, 1000);
        props.callback();
        } else {
          console.log(res.data);
          setAlertState('error');
          setAlertMsg(res.data.errorMsg);
          setSnackstate(true);
        }
        // setTimeout(() => {
        //   setSnackstate(false);
        // }, 1000);
      });

    console.log(values);
    }
  });
  const handleClose = () => {
    setSnackstate(false);
  };
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Stack spacing={1} justifyContent="space-between" sx={{ my: 3 }}>
      <TextField
        fullWidth
        type="text"
        label="Item Name"
        variant="outlined"
        {...getFieldProps('ItemName')}
        error={Boolean(touched.ItemName && errors.ItemName)}
        helperText={touched.ItemName && errors.ItemName}
      />
      
      <TextField
        fullWidth
        type="text"
        label="Price"
        variant="outlined"
        {...getFieldProps('ItemPrice')}
        error={Boolean(touched.ItemPrice && errors.ItemPrice)}
        helperText={touched.ItemPrice && errors.ItemPrice}
      />
      <Button autoFocus color="inherit" onClick={handleSubmit}>
        ADD
      </Button>
      <Snackbar open={snackbarState} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertState} sx={{ width: '100%' }} variant="filled">
          {alertMsg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
