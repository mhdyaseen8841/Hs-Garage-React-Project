// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export function getNavConfig() {
  let user = '';
  if (localStorage.getItem('userType') != null) {
    user = localStorage.getItem('userType');
  }
  console.log(user);
  const navConfig = []
  if (user === 'admin') {
    navConfig.push({
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill'),
    },
      {
        title: 'customer',
        path: '/dashboard/customer',
        icon: getIcon('eva:people-fill'),
      },
      {
        title: 'bill',
        path: '/dashboard/bill',
        icon: getIcon('icon-park-solid:bill'),
      },
      {
        title: 'users',
        path: '/dashboard/users',
        icon: getIcon('carbon:user-filled')
      }
    )
  }
  else if (user === 'staff') {
    navConfig.push({
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill'),
    },
      {
        title: 'customer',
        path: '/dashboard/customer',
        icon: getIcon('eva:people-fill'),
      })
  }
  return navConfig;
}
