import { FC, Fragment, useState } from "react";
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Models
import { UserDataTableInterface } from "../../../../../Model/UserTableModel";

// Data (CSS Syntax and table header)
import { ItemToCenter } from "../../../../../Data/Style";
import { AllUserTableHeader } from "../../../../../Data/TableData";
import { useAuthContext } from "../../../../../Context/User/AuthContext";
import { setDataTextColor } from "../../../../../Controller/SetTextController";

const AllUserTable:FC<UserDataTableInterface> = (DataForAllUserTable) => 
{
    const {value, userData, paginationValue, changeValue, setSearchUserData, searchUserData} = DataForAllUserTable;
    const {IsAdmin} = useAuthContext();
    const TableName = "User";

    const currentTableData = userData[value];
    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = currentTableData.slice(startIndex, endIndex);
    const count = Math.ceil(userData.length / paginationValue);
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
            <Table sx={{tableLayout: 'fixed', width: '100%'}}>
                <TableHead>
                    <TableRow>
                        {AllUserTableHeader.map((header, index) =>
                            (
                                <TableCell sx={{fontSize: '16px'}} key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    {paginatedData.map((data, index) => 
                        (
                            <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>{data.username}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>{data.role}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data} textColor={setDataTextColor(data.status, "Normal", "green", "red")}>{data.status}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>{data.gender}</ContentTableCell>
                                {IsAdmin() && 
                                    (
                                        <ActionTableCell value={value} TableName={TableName} Information={data} changeValue={changeValue as (type: string, newValue: number) => void} 
                                            setSearchUserData={setSearchUserData} searchUserData={searchUserData}/>
                                    )
                                }
                            </TableRow>
                        )
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

export default AllUserTable
