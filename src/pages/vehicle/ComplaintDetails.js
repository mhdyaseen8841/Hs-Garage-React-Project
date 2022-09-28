import { filter, set } from 'lodash';
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
  Dialog,
  styled
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Close }from '@mui/icons-material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import CustomizedDialogs from '../../utils/AlertDialogue';

// mock
// import USERLIST from '../_mock/user';
import ServiceURL from '../../constants/url';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Complaints', label: 'Complaints', alignRight: false },
  { id: 'Problem', label: 'Problem', alignRight: false },
  
  { id: 'Image', label: 'Image', alignRight: false },
  { id: '' },
];

const ImageStyle = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  justifyContent: 'center'
}));

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

export default function ComplaintDetails(props) {
  const navigate = useNavigate()
  const data = useLocation();

  
  

  const handleClose = () => {
    setDialog();
  };

  const [open, setOpen] = useState(true);
  
  const [view, setView] = useState(false);
  
  const [imgPop, setimgPop] = useState(true);
  
  // const [open, setOpen] = useState(true);
const [user,username] = useState("username");
  const [addDialog, setDialog] = useState();
  const [addDeleteDialog, setDeleteDialog] = useState();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [USERLIST,setUserList] = useState([]);

  const [vehicleDetails,setVehicleDetails] = useState('');
  const requestdata = 
  {
    "type" : "SP_CALL",
 "requestId" : 1800006,
     "request": {
      "cmId" : localStorage.getItem("cmId"),
    }
}


      const displayComplaints =()=>{
        console.log(requestdata);
        axios.post(ServiceURL,requestdata).then((res) => {
      console.log(res);
          if(res.data.result.complaints){
            setUserList(res.data.result.complaints);
            console.log("aaaaaaaaaaaaaaaaa");
            console.log(USERLIST.length);
            console.log("---------------------");
            console.log(res.data.result.complaints);
            
          }else{
            setUserList([]);
          }
          
          
          setVehicleDetails({"vehicleModel":res.data.result.model,"vehicleNumber":res.data.result.number});
console.log(vehicleDetails);
        }).catch((err) => {
          console.log(err);
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
      console.log(res);
      setDialog();
      
      // navigate('/dashboard/customerdetails', {state:{name:title}});
    };
    // setDialog(() => (
    //   <AddComplaint
    //     onClose={handleClose}
    //     open={open}
    //      submit={add}
    //      updated={upd}
    //      button={button}
    //      data={data}
    //   />
    // ));
  };
  const deleteUser = (cmdid)=>{
   console.log(USERLIST.length);
    if(USERLIST.length===1){
      setDialog(() => (
        <CustomizedDialogs  onClose={handleClose}  name="complaint"/>
      ))
    }else{

      const deleterequestdata = {
        "type" : "SP_CALL",
      "requestId" : 1900002,
         request: {
      "cmdId" : cmdid
        }
      }

      axios.post(ServiceURL,deleterequestdata).then((res) => {
        console.log(res);   
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

 const viewHandleClose = () =>{
   setView(false);
 }

  const imagepop  = (imgsrc)=> {
    setimgPop(imgsrc)
    setView(true)
  }



  return (
    <Page title="Complaint Details">
      <Dialog open={view}>
          <ImageStyle src={imgPop} alt="" />
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
            onClick={viewHandleClose}
          />
        </Dialog>
      <Container maxWidth="xl">
      {addDialog}
    
      <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
         Complaint Details
          </Typography>

          {/* <Button variant="contained" component={RouterLink} to="#" onClick={handleAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Complaint
          </Button> */}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
         {vehicleDetails.vehicleNumber}
          </Typography>
          <Typography variant="h4" gutterBottom>
          {vehicleDetails.vehicleModel}
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" onClick={handleAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Complaint
          </Button> */}
          
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
                   
                    const { cdId, complaint, problem, image, status, company, avatarUrl, isVerified } = row;
                  //  const isItemSelected = selected.indexOf(name) !== -1;

                    return (

                     
                      <TableRow >
                      
                        <TableCell component="th" scope="row">
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" sx={{cursor: "pointer"}}
                            onClick={()=>{
                              
                           }}>
                              {complaint}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">{problem}</TableCell>
                       
                        
                        <TableCell align="left">
                    

         { image ? 
         <img
          onClick = {()=>{imagepop(image)}}
          style={{width: 150, height: 150, objectFit: 'contain' ,cursor: "pointer"  }}
          src={`${image}`}
          role="presentation"
          alt="no network"
        />
       :  
       <Typography variant="subtitle2" sx={{cursor: "pointer"}}
     >
        No Image
      </Typography>

         }
                        </TableCell>

                        <TableCell align="right"  >
                          <UserMoreMenu  callback={()=>{deleteUser(cdId)}} editUser={(e)=>{}}/>
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
