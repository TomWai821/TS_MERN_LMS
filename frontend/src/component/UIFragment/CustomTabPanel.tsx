import { FC } from "react"
import { Box } from "@mui/material"

import { TabPanelProps } from "../../Model/ContextAndProviderModel"

const CustomTabPanel:FC<TabPanelProps> = ({children ,index, value}) => 
{
    return(
        <Box role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            <Box sx={{ padding: '3px' }}>{children}</Box>
        </Box>
    )
}

export default CustomTabPanel