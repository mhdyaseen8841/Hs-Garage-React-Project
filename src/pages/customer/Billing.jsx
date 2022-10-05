import { Form } from 'formik'

import {React , useState } from 'react';
// material
import {
    TextField,
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
  } from '@mui/material';
  

  // components
  import Page from '../../components/Page';

function Billing() {
    const [noOfRows, setNoOfRows] = useState(1);
  return (
    <Page title="Billing" /* sx={{ paddingTop: 2 }} */>
        <h1  >Billing</h1>
       
<Container maxWidth="xl" mt={5}>
   
    <Stack direction="row" mb={2} justifyContent="space-between" pl={2} pr={2} /* alignItems="center" */ >
        <TextField id="outlined-basic" label="Subject" style ={{width: '49%'}}   variant="outlined" />
  
        <TextField id="outlined-basic" label="invoice #" style ={{width: '49%'}}    variant="outlined" />
      </Stack>

      <Stack direction="row"  mb={2}  justifyContent="space-between" pl={2} pr={2} /* alignItems="center"    */ >
        <TextField id="outlined-basic" label="Customer Name" style ={{width: '49%'}}  variant="outlined" />
  
        <TextField id="outlined-basic" label="Customer Email" style ={{width: '49%'}}    variant="outlined" />
      </Stack>

      <Stack direction="row" mb={2} justifyContent="space-between" pl={2} pr={2} /* alignItems="center"  */ >
        <TextField id="outlined-basic" label="Issued Date" style ={{width: '49%'}}   variant="outlined" />
  
        <TextField id="outlined-basic" label="Due Date" style ={{width: '49%'}}    variant="outlined" />
      </Stack>

      
      {[...Array(noOfRows)].map((elementInArray, index) => {
        return (
      <Stack direction="row" mb={2} justifyContent="space-between" pl={2} pr={2} /* alignItems="center"  */ >
        <TextField id="outlined-basic" label="Item" style ={{width: '49%'}}   variant="outlined" />

        <TextField id="outlined-basic" label="Qty" style ={{width: '16%'}}    variant="outlined" />

        <TextField id="outlined-basic" label="Price" style ={{width: '16%'}}    variant="outlined" />

        <TextField id="outlined-basic" label="Total" style ={{width: '16%'}}    variant="outlined" />
      </Stack>
        )
      })}
      
      <Stack direction="row" mb={2} justifyContent="space-between"  pl={2} /* alignItems="center"  */ >
        
      <Button onClick={() => setNoOfRows(noOfRows + 1)}>+ Add Item</Button>
      </Stack>

      <Stack direction="row" mb={2} justifyContent="space-between" pl={2} pr={2}  alignItems="center"  >
        
      <TextField
     
  id="outlined-multiline-static"
  label="Additional Notes"
  multiline
  rows={5}
  style ={{width: '99%'}} 
  variant="outlined"
/>

        </Stack>

        <Stack  mb={2}  flexDirection={'row'} justifyContent="flex-end" style ={{width: '12%'}}>
        <Button variant="contained">Create Invoice</Button>

        </Stack>

    
</Container>
    </Page>
  
  )
}

export default Billing