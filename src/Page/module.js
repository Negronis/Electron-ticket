import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import help from '../assets/helpAll.png';

import './index.css';
/** 
 *  通过moduleDetail获取模态框详情
 *   分别渲染不同的模态框
 * 
*/
export default function DialogModules(props) {
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const { moduleDetail } = props;
   let { type } = moduleDetail;
   let RenderTemplate = () => {
      if (type === "help") {
         return (
            <div style={{ width: "800px" }}>
               <DialogContent>
                  <div className="dialog-help">
                     <div className="dialog-help-machineing">
                        <img  alt="loading..." width="100%" src={help} />
                     </div>
                  </div>
               </DialogContent>
               <div className="dialog-buttons">
                  <Button onClick={props.close} variant="contained" style={{ background: "#ffa200", color: "#FFF", fontSize: "1.2em" }} >  关闭 </Button>
               </div>
            </div>
         )
      }
   }

   return (
      <div>
         <Dialog
            disableBackdropClick={true}
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.close}
            aria-labelledby="responsive-dialog-title"
            maxWidth="lg"
         >
            <RenderTemplate />
         </Dialog>
      </div>
   );
}