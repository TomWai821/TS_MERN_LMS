import { FC } from "react"
import { Typography } from "@mui/material"
import { TableTitleInterface } from "../../Model/TablePagesAndModalModel";

const TableTitle:FC<TableTitleInterface> = (tableTitleData) => 
{
    const {title, dataLength} = tableTitleData;
    return(
        <Typography sx={{fontSize: '24px'}}>{title} {dataLength === 0 ? "(No Record)" : `(Totally ${dataLength} Records)`}</Typography>
    )
}

export default TableTitle