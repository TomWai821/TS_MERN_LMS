import { FC, Fragment, useState } from "react";
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Models
import { ContactTableInterface } from "../../../../../Model/BookTableModel";
import { AuthorTableHeader } from "../../../../../Data/TableData";
import { ItemToCenter } from "../../../../../Data/Style";
import { ContactInterface } from "../../../../../Model/ResultModel";

const AuthorTable:FC<ContactTableInterface> = (DataForAllUserTable) => 
{
    const {value, contactData, paginationValue} = DataForAllUserTable;
    const TableName = "Contact";

    const currentTableData = contactData.Author as ContactInterface[];
    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = currentTableData.slice(startIndex, endIndex);
    const count = Math.ceil(currentTableData.length / paginationValue);
    
    const getCountPage = () : void | number => 
    {
        return count;
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
                        {AuthorTableHeader.map((header, index) =>
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
                                <TableCell sx={{fontSize: "16px", "&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                <ContentTableCell TableName={TableName} value={value as number} Information={data}>{data.author}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value as number} Information={data}>{data.email}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value as number} Information={data}>{data.phoneNumber}</ContentTableCell>
                                <ActionTableCell TableName={TableName} value={value as number} Information={data} />
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <Pagination sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }} count={getCountPage() as number} page={page} onChange={handlePageChange}/>
        </Fragment>
    );
}

export default AuthorTable
