import { useState } from 'react';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
// @mui
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

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [startdate, setStartDate] = useState(dayjs().startOf('month'));
  const [stopdate, setStopDate] = useState(dayjs());
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="TOTAL HAPPY CUSTOMERS" total={714000}  icon={'ant-design:smile-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="TOTAL VEHICLES" total={1352831} color="info" icon={'ant-design:car-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="TOTAL COMPLAINTS" total={1723315} color="warning" icon={'ant-design:warning-filled'} />
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
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
           />
           <DatePicker
            disableFuture
            label="TO"
            openTo="day"
            value={stopdate}
            onChange={(newValue) => {
              setStopDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
           />
           </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="SALES"
              subheader = "price"
              chartLabels={[
                '01/01/2003',
                '01/02/2003',
                '01/03/2003',
                '01/04/2003',
                '01/05/2003',
                '01/06/2003',
                '01/07/2003',
                '01/08/2003',
                '01/09/2003',
                '01/10/2003',
                '01/11/2003',
                '01/12/2003',
                '01/13/2003',
                '01/14/2003',
                '01/15/2003',
                '01/16/2003',
                '01/17/2003',
                '01/18/2003',
                '01/19/2003',
                '01/20/2003',
                '01/21/2003',
                '01/22/2003',
                '01/23/2003',
                '01/24/2003',
                '01/25/2003',
                '01/26/2003',
                '01/27/2003',
                '01/28/2003',
                '01/29/2003',
                '01/30/2003',
                '01/31/2003',
                '01/01/2003',
                '01/02/2003',
                '01/03/2003',
                '01/04/2003',
                '01/05/2003',
                '01/06/2003',
                '01/07/2003',
                '01/08/2003',
                '01/09/2003',
                '01/10/2003',
                '01/11/2003',
                '01/12/2003',
                '01/13/2003',
                '01/14/2003',
                '01/15/2003',
                '01/16/2003',
                '01/17/2003',
                '01/18/2003',
                '01/19/2003',
                '01/20/2003',
                '01/21/2003',
                '01/22/2003',
                '01/23/2003',
                '01/24/2003',
                '01/25/2003',
                '01/26/2003',
                '01/27/2003',
                '01/28/2003',
                '01/29/2003',
                '01/30/2003',
                '01/31/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30,23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30,23, 11, 22, 27, 13, 22, 37, 21],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43,44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43,44, 55, 41, 67, 22, 43, 21, 41],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39,30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39,30, 25, 36, 30, 45, 35, 64, 52],
                },
              ]}
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
