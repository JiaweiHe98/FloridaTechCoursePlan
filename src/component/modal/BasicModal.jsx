import * as React from 'react';
import Box from '@mui/material/Box';
// import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '8px',
  p: '2rem',
};

export default function BasicModal({ open, handleClose, title, message }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box sx={{ p: '0.5rem', pb: 0, textAlign: 'right' }}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
