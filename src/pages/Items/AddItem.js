import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Container, Typography, TextField, TableContainer,Checkbox, Alert,Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import ServiceURL from '../../constants/url';

export default function FullScreenDialog(details) {
  console.log(details.data);
  const [update, setUpdate] = useState(details.updated);
  const validSchema = Yup.object().shape({
    ItemName: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Name is required'),
    ItemPrice: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Price is required')
   
  });

  const [items, setItems] = useState([])
  const [alertMsg, setAlert] = useState();
  const formik = useFormik({
    initialValues: {
      ItemName: update ? details.data.name :'',
      ItemPrice: update ? details.data.mobile : '',
    
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {

      handleAddNew();
      formik.resetForm();

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

  
  const handleAddNew = ()=>{
    setItems([...items, {
      ItemName: values.ItemName,
      ItemPrice: values.ItemPrice,
   }]);
   

console.log(items);

  }
  

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
              Add Item
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        <Container >
        <Typography variant="h4">ITEM DETAILS</Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ my: 5 }}>
           
            
            <TextField

              fullWidth
              type="text"
              label="Item Name"
              variant="outlined"
              value={details.update ? details.data.name : ''}
              {...getFieldProps('ItemName')}
              error={Boolean(touched.Mobnum && errors.Mobnum || alertMsg)}
              helperText={touched.Mobnum && errors.Mobnum || alertMsg}
            />
            {}
            <TextField
              fullWidth
              type="number"
              label="Item Price"
              variant="outlined"
              {...getFieldProps('ItemPrice')}
              error={Boolean(touched.CustomerName && errors.CustomerName)}
              helperText={touched.CustomerName && errors.CustomerName}
            />
            <Button style={{width:'50px'}} onClick={()=>{handleSubmit()}} variant="outlined">ADD NEW</Button>
          </Stack>
        </Container>
        <TableContainer component={Paper}> 
          <Table maxWidth="sm"  size="small" aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Item Price</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.ItemName}
              </TableCell>
              <TableCell >{row.ItemPrice}</TableCell>
              <TableCell/>
            </TableRow>
          )
        )}
        </TableBody>
      </Table>
      </TableContainer>
         
      </Dialog>
    </div>
  );
}