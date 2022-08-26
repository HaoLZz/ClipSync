import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUser } from '../Users/UserContext';
import apiRequest from '../../utils/api';

export default function AlertDialog({ open = false, setOpen = (f) => f }) {
  const [user, setUser] = useUser();

  const handleGrantPermissions = async (payload) => {
    const options = {
      Authorization: `Bearer ${user.token}`,
    };
    try {
      const updatedUser = await apiRequest(
        'api/users/profile',
        'PATCH',
        payload,
        options,
      );
      if (updatedUser) {
        setUser((user) => {
          return { ...user, ...updatedUser };
        });
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ ...user, ...updatedUser }),
        );
      } else {
        throw new Error('Update user grantPermissions failed');
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onDisagree = () => {
    handleClose();
    handleGrantPermissions({ grantPermissions: false });
  };

  const onAgree = () => {
    handleClose();
    handleGrantPermissions({ grantPermissions: true });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Grant access to clipboard?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let ClipSync gain access to your clipboard. This means reading from
            and writing contents to clipboard. Please click "allow" when
            propmted by Chrome.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDisagree}>Disagree</Button>
          <Button onClick={onAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
