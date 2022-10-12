import { Form } from 'formik'

import { React, useState } from 'react';
// material
import {
  TextField,
  InputAdornment,
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
  TableHead,
  MenuItem,
  Autocomplete,
  OutlinedInput
} from '@mui/material';


// components
import Scrollbar from '../../components/Scrollbar';
import Page from '../../components/Page';

function Billing() {
  const [noOfRows, setNoOfRows] = useState(3);
  const top100Films = [
    {
      label: "Desktop PC",
      rate: 10,
    },
    {
      label: "Notebook",
      rate: 25
    },
    {
      label: "Monitor",
      rate: 36
    }
  ]
  const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const yyyy = today.getFullYear();
const dte = `${yyyy}-${mm}-${dd}`;
console.log(dte);
  return (
    <Page title="Billing" /* sx={{ paddingTop: 2 }} */>
      <h1>Billing</h1>
      <Container maxWidth="xl" mt={5}>
        <Stack direction="row" mb={2} justifyContent="space-between" pl={2} pr={2} /* alignItems="center" */ >
          <TextField id="outlined-basic" label="Customer Name" style={{ width: '25%' }} variant="outlined" />
          <TextField id="outlined-basic" label="invoice #" style={{ width: '25%' }} variant="outlined" />
        </Stack>
        <Stack direction="row" mb={2} justifyContent="flex-end" pl={2} pr={2} width={'100%'} /* alignItems="center"  */ >
          <TextField type="date" id="outlined-basic" label="Issued Date" style={{ width: '25%' }} variant="outlined" value={dte} />
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={20} padding={0}>#</TableCell>
                  <TableCell width={600} padding={0}>ITEM</TableCell>
                  <TableCell padding={0}>QTY</TableCell>
                  <TableCell padding={0}>PRICE</TableCell>
                  <TableCell padding={0}>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(noOfRows)].map((elementInArray, ind) => {
                  return (
                    <TableRow>
                      <TableCell padding={0}>{ind + 1}</TableCell>
                      <TableCell padding={0}>
                        <Autocomplete
                          freeSolo
                          id={`itemcomplete${ind}`}
                          disableClearable
                          options={top100Films}
                          onChange={(event, value)=>{document.getElementById(`price${ind}`).value = value.rate; console.log(value);}}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Item"
                              InputProps={{
                                ...params.InputProps,
                                type: 'Enter Item',
                              }}
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell padding={0}>
                        <OutlinedInput type='number' id={`qty${ind}`} label="1" onChange={(e)=>{document.getElementById(`total${ind}`).value = document.getElementById(`price${ind}`).value * e.target.value}} />
                      </TableCell>
                      <TableCell padding={0}>
                        <OutlinedInput type='number' id={`price${ind}`} endAdornment={<InputAdornment position="end">AED</InputAdornment>}  label="1" inputProps={{min: 0, style: { textAlign: 'right' }}}  onChange={(e)=>{document.getElementById(`total${ind}`).value = document.getElementById(`qty${ind}`).value * e.target.value}}/>
                      </TableCell>
                      <TableCell padding={0}>
                        <OutlinedInput disabled type='number' id={`total${ind}`} endAdornment={<InputAdornment position="end">AED</InputAdornment>} label="1" inputProps={{min: 0, style: { textAlign: 'right' }}} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Stack direction="row" mb={2} justifyContent="space-between" pl={2} /* alignItems="center"  */ >
          <Button onClick={() => setNoOfRows(noOfRows + 1)}>+ Add Item</Button>
        </Stack>

        <Stack mb={2} flexDirection={'row'} justifyContent="flex-end" style={{ width: '100%' }}>
          <Stack mb={2} flexDirection={'col'}>
            <Typography variant='h6'>Grand Total</Typography>
            <Typography variant='h6'><b>{0}</b>  AED</Typography><br/>
            <Button variant="contained">Create Invoice</Button>
          </Stack>
          
        </Stack>
      </Container>
    </Page>

  )
}

export default Billing