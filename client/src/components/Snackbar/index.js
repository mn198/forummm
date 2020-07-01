import React from 'react';
import CustomSnackbar from './CustomSnackbar';
import Snackbar from '@material-ui/core/Snackbar';

export default function newSnackbar(props){
  const {variant, message} = props.props;
  const { open, handleClose } = props;
    return(
      <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
         open={open}
         onClose={handleClose}
        autoHideDuration={2000}
      >
        <CustomSnackbar
          variant={variant}
          message={message}
        />
      </Snackbar>
    )
}