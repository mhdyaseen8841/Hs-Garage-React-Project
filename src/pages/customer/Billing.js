import { Form } from 'formik'

import { React, useState } from 'react';
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
  TableHead,
  MenuItem,
  Autocomplete
} from '@mui/material';


// components
import Scrollbar from '../../components/Scrollbar';
import Page from '../../components/Page';

function Billing() {
  const [noOfRows, setNoOfRows] = useState(3);
  const top100Films = [
    {
      label: "Desktop PC",
      value: 1
    },
    {
      label: "Notebook",
      value: 2
    },
    {
      label: "Monitor",
      value: 3
    }
  ]
  return (
    <Page title="Billing" /* sx={{ paddingTop: 2 }} */>
      <h1>Billing</h1>
      <Container maxWidth="xl" mt={5}>
        <Stack direction="row" mb={2} justifyContent="space-between" pl={2} pr={2} /* alignItems="center" */ >
          <TextField id="outlined-basic" label="Customer Name" style={{ width: '25%' }} variant="outlined" />

          <TextField id="outlined-basic" label="invoice #" style={{ width: '25%' }} variant="outlined" />
        </Stack>


        <Stack direction="row" mb={2} justifyContent="flex-end" pl={2} pr={2} width={'100%'} /* alignItems="center"  */ >
          <TextField id="outlined-basic" label="Issued Date" style={{ width: '25%' }} variant="outlined" />
        </Stack>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={20}>#</TableCell>
                  <TableCell width={600}>ITEM</TableCell>
                  <TableCell>QTY</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(noOfRows)].map((elementInArray, index) => {
                  return (
                    <TableRow>
                      {/* <TextField id="outlined-basic" label="Item" style ={{width: '49%'}}   variant="outlined">
        {categoryDB.map((option) => (
        <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
        ))}
      </TextField> */}
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Autocomplete
                          freeSolo
                          id={`itemcomplete${index}`}
                          disableClearable
                          options={top100Films.map((option) => option.label)}
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
                      <TableCell>
                        <TextField id={`qty${index}`} label="Qty" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <TextField id={`price${index}`} label="Price" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <TextField id={`total${index}`} label="Total" variant="outlined" />
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