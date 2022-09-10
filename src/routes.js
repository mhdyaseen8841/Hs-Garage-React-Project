import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Customer from './pages/CustomerList';
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
        { path: 'register', element: <Register /> },
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
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        {path:'customerdetails', element: <CustomerDetails/> },
        {path:'VehicleDetails', element: <VehicleDetails/> },
        {path:'complaintDetails', element: <ComplaintDetails/> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
