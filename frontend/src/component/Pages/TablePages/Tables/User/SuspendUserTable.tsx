import { FC, Fragment, useState } from "react";

import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment and Manager
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Model
import { UserDataTableInterface } from "../../../../../Model/UserTableModel";

// Data (CSS Syntax and table header)
import { ItemToCenter } from "../../../../../Data/Style";
import { SuspendUserTableHeader } from "../../../../../Data/TableData";

import { CalculateDuration, TransferDateToString } from "../../../../../Controller/OtherController";
import { useAuthContext } from "../../../../../Context/User/AuthContext";
import { setDataTextColor } from "../../../../../Controller/SetTextController";



const SuspendUserTable:FC<UserDataTableInterface> = (DataForBannedUserTable) => 
{
    const {value, userData, paginationValue} = DataForBannedUserTable;
    const {IsAdmin} = useAuthContext();
    const TableName = "User";

    const currentTableData = userData[value];

    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = currentTableData.slice(startIndex, endIndex);
    const count = Math.ceil(currentTableData.length / paginationValue);

    const getCountPage = () : void | number => 
    {
        return currentTableData.length > paginationValue ? count + 1 : count;
    }

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => 
    {
        setPage(newPage);
    };

    useState(() => 
        {
            getCountPage();
        }
    )

    return(
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        {SuspendUserTableHeader.map((header, index) =>
                            (
                                (header.isAdmin && !IsAdmin()) ? null : <TableCell key={index} sx={{fontSize: '16px'}}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    {paginatedData.map((data, index) => 
                        {
                            return(
                                <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                    <TableCell sx={{fontSize: "16px", "&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                    <ContentTableCell TableName={TableName} value={value} Information={data}> {data.username} </ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={value} Information={data}> {data.role} </ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={value} Information={data} textColor={setDataTextColor(data.bannedDetails?.status as string, "Unsuspend", "green", "red")}> {data.bannedDetails?.status} </ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={value} Information={data}> {TransferDateToString(data.bannedDetails?.startDate as Date)} </ContentTableCell>

                                    <ContentTableCell TableName={TableName} value={value} Information={data}> 
                                        {!data.bannedDetails?.dueDate || new Date(data.bannedDetails?.dueDate).getTime() <= 0 ? "Forever" : CalculateDuration(data.bannedDetails?.startDate as Date, data.bannedDetails?.dueDate as Date)}
                                    </ContentTableCell>
                                    
                                    {IsAdmin() && (<ActionTableCell value={value} TableName={TableName} Information={data}/>)}
                                </TableRow>

                            )
                        }
                    )}
                </TableBody>
            </Table>

            <Pagination
                sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }}
                count={getCountPage() as number} 
                page={page}
                onChange={handlePageChange}
            />
        </Fragment>
    );
}

export default SuspendUserTable
