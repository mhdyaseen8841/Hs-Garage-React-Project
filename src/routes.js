import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Customer from './pages/CustomerList';
import Billing from './pages/customer/Billing';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
// import CustomerDetails from './pages/CustomerDetails'
import CustomerDetails  from './pages/VehicleList'
import VehicleDetails from './pages/ComplaintList'
import AddComplaint from './pages/vehicle/AddComplaint';
import ComplaintDetails from './pages/vehicle/ComplaintDetails';
import Profile from './pages/profile';
import Settings from './pages/settings';
import User from './pages/userList';
import Company from './pages/company';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: '404', element: <NotFound /> },
    {
      path: '/',
      element: <Login />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'customer', element: <Customer /> },
        {path:'customerdetails', element: <CustomerDetails/> },
        { path: 'profile', element: <Profile /> },
        { path: 'settings', element: <Settings /> },
        {path:'VehicleDetails', element: <VehicleDetails/> },
        {path:'complaintDetails', element: <ComplaintDetails/> },
        {path:'users', element: <User /> },
        {path:'company', element: <Company /> },
        {path: 'billing', element: <Billing /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
