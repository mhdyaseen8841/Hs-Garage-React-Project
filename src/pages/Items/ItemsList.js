import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import Close from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

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
} from '@mui/material';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import PasswordChange from './AddItemPopup';
import requestPost from '../../serviceWorker';
// mock';
import ServiceURL from '../../constants/url';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'price', alignRight: false },
  
  { id: '' },
];

// ----------------------------------------------------------------------

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

export default function Customer() {
  const navigate = useNavigate()




  const handleClose = () => {
    setOpen(false);
  };
  const passChangeClick = () => {
    setOpen(true);
  };
  const callback = () => {
    display();
    setOpen(false);

  };

  const [USERLIST,setUserList] = useState([]);
  const requestdata = 
  {
    "type" : "SP_CALL",
 "requestId" : 2500001,
     "request": {
}
}

      const display =()=>{
        requestPost(requestdata).then((res) => {
       if(res.data.errorCode === 1){
          setUserList(res.data.result);
       }
       else{
        setUserList([]);
       }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }
  useEffect(() => {
   display();
  }, [])
  
  const [open, setOpen] = useState(false);

  const [addDialog, setDialog] = useState();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const deleteUser = (itemId)=>{
    const deleterequestdata = {
      "type" : "SP_CALL",
   "requestId" : 2500003,
       "request": {
 "itemId" : itemId
}
}

    
    axios.post(ServiceURL,deleterequestdata).then((res) => {   
      display();
        }).catch(() => {
            console.log('No internet connection found. App is running in offline mode.');
          });
             }


         
    

             



  const handleAdd = (e, upd = Boolean(false), button = 'ADD', data = {}) => {
   
    setOpen(true);
    const add = (data) => {
      setDialog();
      if(!upd){
        localStorage.setItem('cId', data.cId);
        handleClose();
        navigate('/dashboard/customerdetails',{state:"add"});
      }
        display();
      
    };
    // setDialog(() => (
      
    //   <FullScreenDialog
    //     onClose={handleClose}
    //     open={open}
    //      submit={add}
    //      updated={upd}
    //      button={button}
    //      data={data}
    //   />
    // ));
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

      <Dialog open={open} fullWidth>
          <Close
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              cursor: 'pointer',
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '100%'
            }}
            onClick={handleClose}
          />
          <DialogTitle>Add Item</DialogTitle>
          <DialogContent>
            <PasswordChange callback={callback} />
          </DialogContent>
        </Dialog>


        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Items
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" onClick={passChangeClick} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Item
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                 // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { cId, id, itemName, role, rate } = row;
                   
                   
                  //  const isItemSelected = selected.indexOf(name) !== -1;
                    return (
                      <TableRow>                      
                        <TableCell component="th" scope="row" >
                            <Typography variant="h6"  sx={{cursor: "pointer"}} >
                            {itemName}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">{rate}</TableCell>
                        <TableCell align="right"  >
                          <UserMoreMenu callback={()=>{deleteUser(id)}} editUser="noedit"/>
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
