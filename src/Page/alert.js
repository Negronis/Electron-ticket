import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'; 

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AlertTab(props) {
   const vertical = "top";
   const horizontal = "center";
   const timer = 3000;
   return (
      <div>
         <Snackbar
            autoHideDuration={timer}
            anchorOrigin={{ vertical, horizontal }}
            open={props.open}
            onClose={props.close} 
            key={vertical + horizontal}
         >
            <Alert onClose={props.close} severity="error">{props.alertMessage}</Alert>
         </Snackbar>
      </div>
   );
}
