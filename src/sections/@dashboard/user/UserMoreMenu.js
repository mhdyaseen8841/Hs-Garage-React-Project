import { useRef, useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import ServiceURL from '../../../constants/url';

import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

const [edit, editdetails] = useState(true)

  const deletereq = () => {
    setIsOpen(false);
    props.callback();
  }

  const edituser = () => {
  
    setIsOpen(false);
    props.editUser();
  }
  useEffect(() => {
if(props.editUser==='noedit'){
  editdetails(false)
 
}
  })

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText onClick={deletereq} primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
 
 {edit ? (
  <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText onClick={edituser} primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

 ): null}



</Menu>
    </>
  );
}
