import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

// material
import {
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
  Dialog,
} from '@mui/material';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import FullScreenDialog from './customer/addCustomer';
import requestPost from '../serviceWorker';
// mock';
import ServiceURL from '../constants/url';
import Invoice from './customer/Invoices';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'billNo', label: 'Bill Number', alignRight: false },
  { id: 'vId', label: 'vehicle Number', alignRight: false },
  { id: 'customerName', label: 'Customer ', alignRight: false },
  { id: 'mobile', label: 'Mobile', alignRight: false },
  { id: 'address', label: 'Amount', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------


  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportExcel = async (data) =>{
      console.log(data);
      const workbook = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "People");

      XLSX.writeFile(wb, "sheetjs.xlsx");
      // FileSaver.saveAs(data1,`sales${fileExtension}`);
  }

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _user.mobile.indexOf(query) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Bills() {
  const navigate = useNavigate()


  const handleClose = () => {
    setDialog();
  };
  const [USERLIST, setUserList] = useState([]);
  
  const [open, setOpen] = useState(true);

  const [addDialog, setDialog] = useState();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [cmid, setcmid] = useState();

  const [openInvoice, setOpenInvoice] = useState(false);

  
  const display = (srtdte) => {

    const requestdata =
  {
    "type": "SP_CALL",
    "requestId": 2100004,
    "request": {
      date:srtdte
    }
  }
    requestPost(requestdata).then((res) => {
      console.log(res.data.result);
      if (res.data.errorCode === 1) {
        setUserList(res.data.result);
      }
      else {
        setUserList([]);
      }
    }).catch((error) => {
      console.log(error);
      console.log('No internet connection found. App is running in offline mode.');
    });
  }
  useEffect(() => {
    display(null);
  }, [])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const deleteUser = (cid) => {
    const deleterequestdata = {
      "type": "SP_CALL",
      "requestId": 1600004,
      request: {
        "id": cid
      }
    }

    axios.post(ServiceURL, deleterequestdata).then((res) => {
      display();
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
  }

  const handleAdd = (e, upd = Boolean(false), button = 'ADD', data = {}) => {

    setOpen(true);
    const add = (data) => {
      setDialog();
      if (!upd) {
        localStorage.setItem('cId', data.cId);
        handleClose();
        navigate('/dashboard/customerdetails', { state: "add" });
      }
      display();

    };
    setDialog(() => (

      <FullScreenDialog
        onClose={handleClose}
        open={open}
        submit={add}
        updated={upd}
        button={button}
        data={data}
      />
    ));
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  function formatDate(date) {

    const d = new Date(date)
    console.log(d);
    let month = `${(d.getMonth() + 1)}`
    let day = `${d.getDate()}`
    const year = `${d.getFullYear()}`

    if (month.length < 2) 
        month = `0${month}`;
    if (day.length < 2) 
        day = `0${day}`;

    return [year, month, day].join('-');
}

  const onClose = () => {
    setOpenInvoice(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;


  return (
    <Page title="Customer">
      <Container maxWidth="xl">
        <Dialog fullScreen open={openInvoice} onClose={onClose}>
          <Invoice data={{ state: cmid }} onclose={onClose} />
        </Dialog>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bills
          </Typography>
        </Stack>

        <Card>
          <Stack direction="row" alignItems="right" justifyContent="space-between" padding={3}>
            <Stack direction="row" alignItems="right" justifyContent="space-between" >
              <Button variant='contained' onClick={()=>{ 
                display(formatDate(new Date(new Date().getFullYear(), 0, 1)));
                }}>This year</Button>
              <Button variant='contained' onClick={()=>{ 
                display(formatDate(new Date(new Date().getFullYear(),new Date().getMonth(), 1)));
                }}>This month</Button>
              <Button variant='contained' onClick={()=>{ 
                display(formatDate(new Date()));
                }}>Today</Button>
            </Stack>
            <Stack direction="row" alignItems="right" justifyContent="space-between">
              <Button onClick={()=>{exportExcel(USERLIST)}}>Export Excel</Button>
            </Stack>
          </Stack>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { billId, cmpId, name, mobile, vehicle, amount, date } = row;
                    return (
                      <TableRow>
                        <TableCell align="left">{billId}</TableCell>
                        <TableCell align="left">{vehicle}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{mobile}</TableCell>
                        <TableCell align="left">{amount}</TableCell>
                        <TableCell align="left">{date}</TableCell>
                        <TableCell align="right" >
                          <ReceiptIcon style={{ cursor: 'pointer' }} onClick={() => {
                            setcmid(cmpId)
                            setOpenInvoice(true);
                          }} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
