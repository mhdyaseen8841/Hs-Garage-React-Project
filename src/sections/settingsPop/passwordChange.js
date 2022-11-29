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
    currentP: Yup.string()
      .matches(/^\S/, 'Whitespace is not allowed')
      .required('Enter current password'),
    newP: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Enter new password'),
    repeatNewP: Yup.string()
      .matches(/^\S/, 'Whitespace is not allowed')
      .required('Enter repeat new password')
      .oneOf([Yup.ref('newP'), null], 'Passwords must match')
  });
  const [alertState, setAlertState] = useState('success');
  const [alertMsg, setAlertMsg] = useState();
  const [snackbarState, setSnackstate] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentP: '',
      newP: '',
      repeatNewP: ''
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      const requestOptions = {
        "type": "SP_CALL",
      "requestId": 6511354,
      "request": {
        "uid" : localStorage.getItem("loginId"),
        "npassword": getFieldProps('newP').value,
        "cpassword": getFieldProps('currentP').value
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
        type="password"
        label="Current password"
        variant="outlined"
        {...getFieldProps('currentP')}
        error={Boolean(touched.currentP && errors.currentP)}
        helperText={touched.currentP && errors.currentP}
      />
      <TextField
        fullWidth
        type="password"
        label="New password"
        variant="outlined"
        {...getFieldProps('newP')}
        error={Boolean(touched.newP && errors.newP)}
        helperText={touched.newP && errors.newP}
      />
      <TextField
        fullWidth
        type="password"
        label="Repeat new password"
        variant="outlined"
        {...getFieldProps('repeatNewP')}
        error={Boolean(touched.repeatNewP && errors.repeatNewP)}
        helperText={touched.repeatNewP && errors.repeatNewP}
      />
      <Button autoFocus color="inherit" onClick={handleSubmit}>
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
