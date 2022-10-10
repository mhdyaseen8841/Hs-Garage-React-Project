import { useEffect } from 'react';

import { Link as RouterLink,useNavigate, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login(props) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(location.state === 'logout'){
      window.location.reload(false);
      window.history.replaceState({}, document.title)
    }
    if (localStorage.getItem('loginId') !== null) {
      navigate('/dashboard/app', { replace: true });
    }
  }, []);

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />

          
        </HeaderStyle>

        

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>
            <LoginForm />           
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
