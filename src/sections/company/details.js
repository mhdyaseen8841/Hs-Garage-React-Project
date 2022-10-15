import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { Stack, TextField, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ServiceURL from '../../constants/url';

export default function DetailsChange(props) {
  const validSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^\S/, 'Whitespace is not allowed'),
    mobile: Yup.string().matches(/^\S/, 'Whitespace is not allowed'),
    email: Yup.string()
      .matches(/^\S/, 'Whitespace is not allowed')
      .email('email format error')
  });
  const [alertState, setAlertState] = useState('success');
  const [alertMsg, setAlertMsg] = useState();
  const [snackbarState, setSnackstate] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: props.data.name,
      mobile: props.data.mobile,
      email: props.data.email
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      const requestOptions = {
        "type" : "SP_CALL",
        "requestId" : 2400003,
        "request": {
	      "companyname" : values.name,
        "mobile" : values.mobile,
        "email" : values.email,
        "addresss" : props.data.address,
        "city" : props.data.city,
        "tax" : props.data.tax,
        "bankname" : props.data.bank,
        "accnumber" : props.data.accnumber,
        "ifsc" : props.data.ifsc
}
  }

      axios.post(ServiceURL, requestOptions).then((res) => {
        if (res.data.errorCode === 1) {
          setAlertState('success');
          setAlertMsg(res.data.errorMsg);
          setSnackstate(true);
          setTimeout(() => {
            setSnackstate(false);
            props.callback();
          }, 1000);
        } else {
          console.log(res.data);
          setAlertState('error');
          setAlertMsg(res.data.errorMsg);
          setSnackstate(true);
        }
        setTimeout(() => {
          setSnackstate(false);
        }, 1000);
      });
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
        label="Company Name"
        variant="outlined"
        {...getFieldProps('name')}
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
      />
      <TextField
        fullWidth
        type="number"
        label="Phone No."
        variant="outlined"
        {...getFieldProps('mobile')}
        error={Boolean(touched.mobile && errors.mobile)}
        helperText={touched.mobile && errors.mobile}
      />
      <TextField
        fullWidth
        type="text"
        label="email"
        variant="outlined"
        {...getFieldProps('email')}
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
      />
      <Button autoFocus variant='outlined' color="primary" onClick={handleSubmit}>
        SAVE
      </Button>
      <Snackbar open={snackbarState} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertState} sx={{ width: '100%' }} variant="filled">
          {alertMsg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
