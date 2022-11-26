import { Form } from 'formik'
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

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
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
  Dialog
} from '@mui/material';


// components
import Scrollbar from '../../components/Scrollbar';
import Page from '../../components/Page';
import Invoice from './Invoices';
import ServiceURL from '../../constants/url';

function Billing() {


  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const data = useLocation();

  const [noOfRows, setNoOfRows] = useState(3);
  const [items, setItems] = useState([]);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const dte = `${yyyy}-${mm}-${dd}`;
  console.log(dte);


  const [invoiceData, setInvoiceData] = useState({})
  const [userData, setUserData] = useState({})





  useEffect(() => {



    const requestdata = {
      "type": "SP_CALL",
      "requestId": 2100002,
      "request": {
        "cmId": data.state.cid
      }
    }


    axios.post(ServiceURL, requestdata).then((res) => {
      setUserData(res.data.result);
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    })


    const requestdata2 = {
      "type": "SP_CALL",
      "requestId": 2500001,
      "request": {
      }
    }
    axios.post(ServiceURL, requestdata2).then((res) => {
      console.log(res.data.result);
      setItems(res.data.result.map((value) => { return { label: value.itemName, rate: value.rate } }));
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    })

  }, [])

  const servArr = []
  const itemArr = []
  let bills = []

  const generateBill = () => {

    console.log(data.state.cid);
    const requestdata = {
      "type": "SP_CALL",
      "requestId": 2100003,
      "request": {
        "cmId": data.state.cid,
        "bills": bills
      }
    }

    console.log("bill generation");
    console.log(requestdata);

    axios.post(ServiceURL, requestdata).then((res) => {

      console.log(res);
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    })
  }

  const createInvoice = () => {
    console.log("createInvoice");

    const cname = document.getElementById("cname").value;
    const invnum = document.getElementById("invnum").value;
    const date = document.getElementById("date").value;

    [...Array(noOfRows)].map((elementInArray, ind) => {

      if (document.getElementById(`item${ind}`).value !== "") {
        console.log(document.getElementById(`service${ind}`).innerHTML);
        if (document.getElementById(`service${ind}`).innerHTML === "Item") {

          itemArr.push({
            "service": document.getElementById(`item${ind}`).value,
            "serviceType": "0",
            "qty": document.getElementById(`qty${ind}`).value,
            "price": document.getElementById(`price${ind}`).value,
          })
        } else {

          servArr.push({
            "service": document.getElementById(`item${ind}`).value,
            "serviceType": "1",
            "qty": document.getElementById(`qty${ind}`).value,
            "price": document.getElementById(`price${ind}`).value,

          })
        }


      }
      return 0;
    })
    bills = itemArr.concat(servArr);



    generateBill();

    const invoice = {
      "customer": cname,
      "invoiceNum": invnum,
      "date": date,
      "items": itemArr,
      "services": servArr
    }
    setInvoiceData(invoice)
    console.log(invoice)
    setOpen(true)
    // navigate('/dashboard/Invoice',{state:invoice});

  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <Page title="Billing" /* sx={{ paddingTop: 2 }} */>
      <h1>Billing</h1>
      <h6>Vehicle number :{userData.vehicleNumber}</h6>
      <Dialog fullScreen open={open} onClose={onClose}>
        <Invoice data={{ state: invoiceData }} onclose={onClose} />
      </Dialog>
      <Container maxWidth="xl" mt={5}>
        <Stack direction="row" mb={2} justifyContent="space-between" pl={2} pr={2} /* alignItems="center" */ >
          <TextField id="cname" defaultValue={userData.name} style={{ width: '25%' }} variant="outlined" />
          <TextField id="invnum" label="invoice #" style={{ width: '25%' }} variant="outlined" />
        </Stack>
        <Stack direction="row" mb={2} justifyContent="flex-end" pl={2} pr={2} width={'100%'} /* alignItems="center"  */ >
          <TextField type="date" id="date" label="Issued Date" style={{ width: '25%' }} variant="outlined" value={dte} />
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={20} padding={0}>#</TableCell>
                  <TableCell width={400} padding={0}>ITEM</TableCell>
                  <TableCell padding={0}>Service/Item</TableCell>

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
                          id={`item${ind}`}
                          disableClearable
                          options={items}
                          onChange={(event, value) => { 
                            document.getElementById(`price${ind}`).value = value.rate; 
                            document.getElementById(`total${ind}`).value = document.getElementById(`qty${ind}`).value * document.getElementById(`price${ind}`).value;
                          }}
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
                        <FormControl fullWidth>

                          <Select
                            id={`service${ind}`}
                            label="i"
                            defaultValue={1}
                          >
                            <MenuItem value={1}>Item</MenuItem>
                            <MenuItem value={2}>Service</MenuItem>
                          </Select>
                        </FormControl>



                      </TableCell>
                      <TableCell padding={0}>
                        <OutlinedInput type='number' id={`qty${ind}`} label="1" defaultValue={1} onChange={(e) => { document.getElementById(`total${ind}`).value = document.getElementById(`price${ind}`).value * e.target.value }} />
                      </TableCell>
                      <TableCell padding={0}>
                        <OutlinedInput type='number' id={`price${ind}`} endAdornment={<InputAdornment position="end">AED</InputAdornment>} label="1" inputProps={{ min: 0, style: { textAlign: 'right' } }} onChange={(e) => { document.getElementById(`total${ind}`).value = document.getElementById(`qty${ind}`).value * e.target.value }} />
                      </TableCell>
                      <TableCell padding={0}>
                        <OutlinedInput disabled type='number' id={`total${ind}`} endAdornment={<InputAdornment position="end">AED</InputAdornment>} label="1" inputProps={{ min: 0, style: { textAlign: 'right' } }} />
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
            <Button variant="contained" onClick={createInvoice} >Create Invoice</Button>
          </Stack>

        </Stack>
      </Container>
    </Page>

  )
}

export default Billing