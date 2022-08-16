import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({
  open = false,
  setOpen = (f) => f,
  setAgree,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const onDisagree = () => {
    handleClose();
    setAgree('denied');
  };

  const onAgree = () => {
    handleClose();
    setAgree('granted');
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
