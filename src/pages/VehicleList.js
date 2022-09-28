import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import FullScreenDialog from './vehicle/addVehicle';
import CustomizedDialogs from '../utils/AlertDialogue';

// mock
// import USERLIST from '../_mock/user';
import ServiceURL from '../constants/url';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'VehicleNumber', label: 'Vehicle Number', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'Model', label: 'Model Name', alignRight: false },
  
  { id: 'year', label: 'Year', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CustomerDetails() {
  const navigate = useNavigate()
  const data = useLocation();

  
  // const [cid, setCid] = useState(data.state.cId)  
 
  const handleClose = () => {
    setDialog();
  };

  const [user,setUsername] = useState();
  const [USERLIST,setUserList] = useState([]);
  const requestdata = 
  {
    "type" : "SP_CALL",
     "requestId" : 1700005,
      "request": {
"uId" : localStorage.getItem('cId')
}
  }


  function display(){
    console.log(data.state);
    axios.post(ServiceURL,requestdata).then((res) => {
      console.log(res.data);
      setUsername(res.data.result.cname)
  if(res.data.errorCode===0){
    
    setUserList(res.data.result.vehicles);
  }else{
    setUserList([]);
  }
    
    }).catch((error) => {
      console.log(error);
        console.log('No internet connection found. App is running in offline mode.');
      });
  }
    
      
  useEffect(() => {
    display();
   if(data.state==="add"){
    handleAdd()
   }
    
   
    

  }, [])

  const [open, setOpen] = useState(true);

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


  const handleAdd = (e, upd = Boolean(false), button = 'ADD', data = {}) => {
    setOpen(true);
    const add = (data) => {
      console.log(data);
      setDialog();
<<<<<<< HEAD
=======

      display();
>>>>>>> b12b70e8a6f575f8d6f165292f351e8835925336
      if(!upd){
        localStorage.setItem('vId', data.vId);
        handleClose();
        setOpen(false);
      navigate('/dashboard/vehicledetails',{state:"add"});
      }
<<<<<<< HEAD
      display();
=======

      
>>>>>>> b12b70e8a6f575f8d6f165292f351e8835925336
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

  const deleteUser = (vId)=>{

console.log(USERLIST.length);
    if(USERLIST.length===1){
      setDialog(() => (
        <CustomizedDialogs  onClose={handleClose}  name="vehicle"/>
      ))
    }else{
    
    const deleterequestdata = {
      "type" : "SP_CALL",
    "requestId" : 1700002,
       request: {
    "vId" : vId
      }
    }
    
    axios.post(ServiceURL,deleterequestdata).then((res) => {
      console.log(res);   
      display();
        }).catch(() => {
            console.log('No internet connection found. App is running in offline mode.');
          });
             }

            }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

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
    <Page title="Vehicles">
      <Container maxWidth="xl">
      {addDialog}
      <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          {user}
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" onClick={handleAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Vehicle
          </Button>
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

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
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { vId,id, number, model, Company,year } = row;
                  //  const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow >
                        <TableCell component="th" scope="row">
                            <Typography variant="h6" sx={{cursor: "pointer"}}
                            onClick={()=>{
                              localStorage.setItem('vId', vId);
                             navigate('/dashboard/vehicleDetails')
                           }}>
                              {number}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">{Company}</TableCell>
                       
                        <TableCell align="left">{model}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" >
                            {year}
                          </Label>
                        </TableCell>
                        <TableCell align="right"  >
                          <UserMoreMenu  callback={()=>{deleteUser(vId)}} editUser={(e)=>handleAdd(e,true,'EDIT',row)}/>
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
