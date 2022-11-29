import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';




// material
import {
  Menu, 
  MenuItem, 
  IconButton, 
  ListItemIcon, 
  ListItemText,
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
import AddComplaint from './vehicle/AddComplaint';
import CustomizedDialogs from '../utils/AlertDialogue';

// mock
// import USERLIST from '../_mock/user';
import ServiceURL from '../constants/url';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'VisitDate', label: 'Visit date', alignRight: false },
  { id: 'PickDate', label: 'Pick date', alignRight: false },
  
  { id: 'Remarks', label: 'Remarks', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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


export default function VehicleDetails(props) {
  const navigate = useNavigate()
  const data = useLocation();

  
  

  const handleClose = () => {
    setDialog();
  };

  const [open, setOpen] = useState(true);
const [user,username] = useState("username");
  const [addDialog, setDialog] = useState();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);


  const [USERLIST,setUserList] = useState([]);

  const ref = useRef(null);
  const requestdata = 
    {
      "type":"SP_CALL",
      "requestId":1800005,
      "request":{
        "vId" : localStorage.getItem("vId")
      }
    }
      const displayComplaints =()=>{
        axios.post(ServiceURL,requestdata).then((res) => {
      
          setUserList(res.data.result.complaints);
        }).catch(() => {
            console.log('No internet connection found. App is running in offline mode.');
          });
      }
  useEffect(() => {
    displayComplaints();
     
  
   
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleAdd = (e, upd = Boolean(false), button = 'ADD', data = {}) => {
    setOpen(true);
    const add = (res) => {
displayComplaints()
      setDialog();
 
      // navigate('/dashboard/customerdetails', {state:{name:title}});
    };
    setDialog(() => (
      <AddComplaint
        onClose={handleClose}
        open={open}
         submit={add}
         updated={upd}
         button={button}
         data={data}
      />
    ));
  };



  const deleteUser = (cmId)=>{

    if(USERLIST.length===1){
      setDialog(() => (
        <CustomizedDialogs  onClose={handleClose}  name="complaint"/>
      ))
    }else{
    const deleterequestdata =
    {
         "type" : "SP_CALL",
      "requestId" : 1800002,
          "request": {
           "cmId" :cmId
          }
        }  
    
    axios.post(ServiceURL,deleterequestdata).then((res) => {
      displayComplaints();
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


  // status popup

  const StatusMenu = (prop)=>{

    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    const spcall = (status)=>{
      const requestdata =  {
        "type" : "SP_CALL",
        "requestId" : 1800007,
        "request": {
         "cmId" : prop.cmid,
	       "status" : status
       }
      }
       axios.post(ServiceURL,requestdata).then((res) => {
        displayComplaints();
          }).catch(() => {
              console.log('No internet connection found. App is running in offline mode.');
        })
     }
    return(
      <>
      <Button ref={ref} variant="contained" sx={{ cursor: 'pointer', userSelect: 'none' }} color={prop.status === 0 ? 'error' : 'success'} onClick={() => {setIsOpen(true); } }>
        {prop.status === 0 ? 'not completed' : 'completed'}
      </Button>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
         {!prop.status ?
          <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{spcall(1)}}>
            <ListItemIcon>
               <Iconify icon="carbon:task-complete" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Complete" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
          :
          <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{spcall(0)}}>
            <ListItemIcon>
               <Iconify icon="mdi:timer-sand-complete" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="not complete" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        }
        </Menu></>);
  }
  return (
    <Page title="Complaints">
      <Container maxWidth="xl">
      {addDialog}
      <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
         vehicle complaints
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" onClick={handleAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Complaint
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
                    const { cmId,vId,id,remark, pickDate, visitDate, status, company, avatarUrl, isVerified } = row;
                  //  const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow >
                        <TableCell component="th" scope="row">
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" sx={{cursor: "pointer"}}
                            onClick={()=>{
                              localStorage.setItem('cmId', cmId);
                             navigate('/dashboard/complaintDetails')
                           }}>
                              {visitDate}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">{pickDate !== '0000-00-00' ? pickDate : "not picked"}</TableCell>
                        
                        <TableCell align="left">
                        {remark}
                        </TableCell>
                        <TableCell align="left" >
                        
                        <StatusMenu ref={ref} status={status} cmid={cmId} />
                        </TableCell>

                        <TableCell align="right"  >
                          <UserMoreMenu callback={()=>{deleteUser(cmId)}} editUser={(e)=>handleAdd(e,true,'EDIT',row)} noEdit />
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
