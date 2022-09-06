import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, Stack, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
// component
import Iconify from '../../../components/Iconify';

import ServiceURL from '../../../constants/url';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState();
  const LoginSchema = Yup.object().shape({
    user: Yup.string().required('User is required'),
    password: Yup.string().required('Password is required'),
    validation: Yup.string()
  });

  useEffect(() => {
    axios.get('https://geolocation-db.com/json/').then((res) => {
      localStorage.setItem('IP', res.data.IPv4);
    });
  });

  const formik = useFormik({
    initialValues: {
      user: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      console.log(getFieldProps('user').value);
      console.log(localStorage.getItem('IP'));
      const requestOptions = {
        "type" : "Authetication",
           "request": {
        "username" : getFieldProps('user').value,
             "password" : getFieldProps('password').value
              }
        }
        

      axios.post(ServiceURL,requestOptions).then((res) => {
        console.log(res);
        if(res.data.errorCode===1){
          localStorage.setItem('loginId', res.data.result.aid);
          localStorage.setItem('name', res.data.result.name);
          navigate('/dashboard/app', { replace: true });
        }
    
        else{
          setTimeout(() => {
            // alert(res.data.msg);
            actions.setSubmitting(false);
            setAlert(
              <>
                <Alert variant="filled" severity="error">
                 wrong input
                </Alert>
                <br />
              </>
            );
          }, 1000);
        }
        
      }).catch(() => {
          console.log('No internet connection found. App is running in offline mode.');
        });
    

      
      // axios.post(`${ServiceURL}adminValidate.php`, requestOptions).then((res) => {
      //   if (res.data.status === 'success') {
      //     localStorage.setItem('accessToken', res.data.accessToken);
      //     localStorage.setItem('ectroId', res.data.user.id);
      //     localStorage.setItem('name', res.data.user.name);
      //     localStorage.setItem('email', res.data.user.email);
      //     localStorage.setItem('username', res.data.user.username);
      //     localStorage.setItem('avatar', res.data.user.avatar);
      //     localStorage.setItem('job', res.data.user.job);
      //     localStorage.setItem('descib', res.data.user.descib);
      //     navigate('/dashboard/App', { replace: true });
      //   } else {
      //     // console.log(res.data.status);
      //     setTimeout(() => {
      //       // alert(res.data.msg);
      //       actions.setSubmitting(false);
      //       setAlert(
      //         <>
      //           <Alert variant="filled" severity="error">
      //             {res.data.msg}
      //           </Alert>
      //           <br />
      //         </>
      //       );
      //     }, 1000);
      //   }
      // });
    }
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      {alert}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="User Name"
            {...getFieldProps('user')}
            error={Boolean(touched.user && errors.user)}
            helperText={touched.user && errors.user}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
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
          />
        </Stack>

        <Stack direction="row" alignItems="right" justifyContent="space-between" sx={{ my: 1 }}>
          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
