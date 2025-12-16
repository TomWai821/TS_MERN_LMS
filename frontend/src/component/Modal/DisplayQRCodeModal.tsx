import { FC } from "react"
import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

import { ModalBodySyntax } from "../../Data/Style";

import ModalTemplate from "../Templates/ModalTemplate";

import { QRCodeInterface } from "../../Model/ModelForModal";

const DisplayQRCodeModal:FC<QRCodeInterface> = (qrCodeData) => 
{
    const {username, authToken} = qrCodeData;
    console.log(JSON.stringify({username, authToken}));

    return(
        <ModalTemplate title={"Display QR Code"} width="400px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={{...ModalBodySyntax, justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}>
                <Typography sx={{fontSize: '24px', fontweight: 'bold', paddingBottom: '25px'}}>Scan To Loan Book</Typography>
                <QRCode value={JSON.stringify({username, authToken})}/>
            </Box>
        </ModalTemplate>
    );
}

export default DisplayQRCodeModal