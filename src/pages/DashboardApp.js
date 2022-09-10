import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
// @muii
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField } from '@mui/material';
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

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [startdate, setStartDate] = useState(dayjs().startOf('month'));
  const [stopdate, setStopDate] = useState(dayjs());
  const [counts, setCounts] = useState({});
  const [chartData, setChartData] = useState([]);
  const [chartlabel, setChartLable]  = useState([]);
  const dateChange = (date1,date2) => {
    const requestdata = {
      "type": "SP_CALL",
    "requestId": 6511353,
    "request": {
      "startDate": date1.format("YYYY/MM/DD"),
      "stopDate" : date2.format("YYYY/MM/DD")
      }
    }
    requestPost(requestdata).then((res)=>{
      if(res.data.errorCode === 0){
        console.log(res.data.result)
        const label = []
        const cdata = []
        res.data.result.chart.map((data)=>{
           label.push(data.date)
           cdata.push(data.amount)
           return data;
        })
        console.log(cdata);
        console.log(label);
        setChartData(cdata);
        setChartLable(label)
        // console.log(chartData);
        // console.log(chartlabel);
      }
      else{
         console.log(res.data.errorMsg)
         setChartData([])
      }
    })
}
  useEffect(() => {
    const requestData = {
      "type": "SP_CALL",
      "requestId": 6511352,
      "request": {}
    }
    requestPost(requestData).then((res)=>{
      if(res.data.errorCode === 1){
        setCounts(res.data.result)
      }
    })
    dateChange(startdate,stopdate);
  }, [])
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                label="FROM"
                openTo="day"
                value={startdate}
                onChange={(newValue) => {
                  setStartDate(newValue)
                  dateChange(newValue,stopdate);
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
                  dateChange(startdate,newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="SALES"
              subheader="price"
              chartLabels={chartlabel}
              chartData={ [{name:'AMOUNT',type:'column',fill:'solid', data: chartData}]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
