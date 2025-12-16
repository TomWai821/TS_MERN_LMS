import { FC } from "react";
import { Typography } from "@mui/material"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { DeleteButton } from "../../Data/Style";

const DeleteTypography:FC = () => 
{
    return( 
        <Typography sx={{display:'flex', alignContent: 'center', color: DeleteButton.backgroundColor, paddingBottom: '30px'}}>
            <WarningAmberIcon/>Warning: This Action could not be undone
        </Typography>
    )
}

export default DeleteTypography;