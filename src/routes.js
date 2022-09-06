import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Customer from './pages/Customer';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
// import CustomerDetails from './pages/CustomerDetails'
import CustomerDetails  from './pages/CustomerDetails'
import VehicleDetails from './pages/VehicleDetails'
import AddComplaint from './pages/vehicle/AddComplaint';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
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
        
      ],
    },
    { path: '/demo', element: <AddComplaint /> },
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
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
