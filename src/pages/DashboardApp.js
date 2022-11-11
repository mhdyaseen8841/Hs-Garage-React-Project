import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
// @muii
import { useTheme } from '@mui/material/styles';
import {
  Stack,
  Grid,
  Container,
  Typography,
  TextField,
  TableRow,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Icon
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import requestPost from '../serviceWorker';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'vehicleNumber', label: 'Vehicle NO.', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'mobile', label: 'Mobile', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'staff', label: 'staff', alignRight: false },
  { id: 'visitDate', label: 'visit Date', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
  { id: 'bill', label: 'Bill', alignRight: false },
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
    return filter(array, (_user) => _user.vnumber.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _user.mobile.indexOf(query) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function DashboardApp() {
  const theme = useTheme();

  const navigate = useNavigate()

  const [USERLIST, setUserList] = useState([]);

  const [open, setOpen] = useState(true);

  const [addDialog, setDialog] = useState();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('vehicleNumber');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [startdate, setStartDate] = useState(dayjs().startOf('month'));
  const [stopdate, setStopDate] = useState(dayjs());
  const [counts, setCounts] = useState({});
  const [chartData, setChartData] = useState([]);
  const [chartlabel, setChartLable] = useState([]);
  let user = false;
    if (localStorage.getItem('userType') != null && localStorage.getItem('userType') === 'admin') {
      user = true;
    }
  const dateChange = (date1, date2
    ) => {
    const requestdata = {
      "type": "SP_CALL",
      "requestId": 6511353,
      "request": {
        "startDate": date1.format("YYYY/MM/DD"),
        "stopDate": date2.format("YYYY/MM/DD")
      }
    }
    console.log(requestdata);
    requestPost(requestdata).then((res) => {
      console.log(res.data);
      if (res.data.errorCode === 0) {
        console.log(res.data.result)
        const label = []
        const cdata = []
        if (res.data.result.chart[0] != null) {
          res.data.result.chart.map((data) => {
            label.push(data.date)
            cdata.push(data.amount)
            return data
          })
        }
        if (res.data.result.tableData[0] != null) {
          setUserList(res.data.result.tableData);
        }
        else {
          setUserList([])
        }
        setChartData(cdata);
        setChartLable(label)
        console.log(USERLIST);
        // console.log(chartData);
        // console.log(chartlabel);
      }
      else {
        console.log(res.data.errorMsg)
        setChartData([])
        setUserList([])
      }
    })
  }
  useEffect(() => {
    const requestData = {
      "type": "SP_CALL",
      "requestId": 6511352,
      "request": {}
    }
    requestPost(requestData).then((res) => {
      if (res.data.errorCode === 1) {
        setCounts(res.data.result)
      }
    })
    dateChange(startdate, stopdate);
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
function billing (cmId){
  navigate('/dashboard/billing', {state:{cid:cmId}})
}

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="TOTAL HAPPY CUSTOMERS" total={counts.customerCount} icon={'ant-design:smile-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="TOTAL VEHICLES" total={counts.vehicleCount} color="info" icon={'ant-design:car-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="TOTAL COMPLAINTS" total={counts.complaintCount} color="warning" icon={'ant-design:warning-filled'} />
          </Grid>

          <Grid item xs={12} md={12} lg={12} >
            <Typography variant="h6" sx={{ mb: 5 }}>
              Search Dates
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}  >
              <DatePicker
                disableFuture
                label="FROM"
                openTo="day"
                value={startdate}
                onChange={(newValue) => {
                  setStartDate(newValue)
                  dateChange(newValue, stopdate);
                }}
                renderInput={(params) => <TextField {...params} />}
                
              />
              <DatePicker
                disableFuture
                label="TO"
                openTo="day"
                firstDate={startdate.format('YYYY-MM-DD')}
                value={stopdate}
                onChange={(newValue) => {
                  setStopDate(newValue);
                  dateChange(startdate, newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          {user && <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="SALES"
              subheader="price"
              chartLabels={chartlabel}
              chartData={[{ name: 'AMOUNT', type: 'column', fill: 'solid', data: chartData }]}
            />
          </Grid>
          }

          <Grid item xs={12} md={12} lg={12}>

            <Card>
              <Typography variant="h4" padding={3}>
                Latest Complaints
              </Typography>
              <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>

                  <Table >
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {filteredUsers && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { username, name, mobile, address, vnumber, vdate, status, cmId } = row;
                        // const title = name;
                        //  const isItemSelected = selected.indexOf(name) !== -1;
                        return (
                          <TableRow>
                            <TableCell component="th" scope="row" onClick={() => {
                              localStorage.setItem('cmId', cmId);
                              console.log(cmId)
                              navigate('/dashboard/complaintDetails')
                            }}>
                              <Typography variant="h6" sx={{ cursor: "pointer" }}  >
                                {vnumber}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{mobile}</TableCell>
                            <TableCell align="left">{address}</TableCell>
                            <TableCell align="left">{username}</TableCell>
                            <TableCell align="left">{vdate}</TableCell>
                            <TableCell align="left">
                              <Label variant="ghost" color={status === 0 ? 'error' : 'success'}>
                                {status === 0 ? 'not completed' : 'completed'}
                              </Label>
                            </TableCell>
                            <TableCell align="left"  onClick={()=>{
                               navigate('/dashboard/billing', {state:{cid:cmId}})
                            }} >
                            <Label sx={{cursor: "pointer"}} variant="ghost" color={'success'}>
                               Generate Bill
                              </Label>
                            </TableCell>
                            {/* <TableCell align="right"  >
                              <UserMoreMenu callback={deleteUser} editUser={handleAdd} />
                            </TableCell> */}
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
          </Grid>


        </Grid>
      </Container>
    </Page>
  );
}
