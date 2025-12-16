import { FC, Fragment, useState } from "react";
import { Avatar, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Models
import { BookRecordTableInterface } from "../../../../../Model/BookTableModel";
import { AllBookTableHeader } from "../../../../../Data/TableData";
import { ItemToCenter } from "../../../../../Data/Style";
import { BookDataInterface } from "../../../../../Model/ResultModel";
import { useAuthContext } from "../../../../../Context/User/AuthContext";
import { setDataTextColor } from "../../../../../Controller/SetTextController";

const AllBookTable:FC<BookRecordTableInterface> = (DataForAllUserTable) => 
{
    const {value, bookData, paginationValue, changeValue, setSearchBook, searchBook} = DataForAllUserTable;
    const TableName = "Book";
    const {IsLoggedIn} = useAuthContext();

    const currentTableData = bookData[value] as BookDataInterface[];
    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = currentTableData.slice(startIndex, endIndex);
    const count = Math.ceil(bookData.length / paginationValue);
    
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
                        {AllBookTableHeader.map((header, index) =>
                            (
                                (header.isLoggedIn && !IsLoggedIn()) ? null : 
                                <TableCell sx={{fontSize: '16px'}} key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    {paginatedData.map((data, index) => 
                        (
                            <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                <TableCell sx={{fontSize: "16px", "&:hover": {cursor: "pointer"}}}>{(paginationValue * (page - 1)) + index + 1}</TableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>
                                    <Avatar src={data.image?.url} alt="Preview" variant="rounded" sx={{width: "150px", height: "225px"}}/>
                                </ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>{data.bookname}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>{data.genreDetails?.genre}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>{data.languageDetails?.language}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>{data.authorDetails?.author}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} Information={data}>{data.publisherDetails?.publisher}</ContentTableCell>
                                {IsLoggedIn() && 
                                    (
                                        <Fragment>
                                            <ContentTableCell TableName={TableName} value={value} Information={data} textColor={setDataTextColor(data.status, "OnShelf", "green", "red" )}>{data.status}</ContentTableCell>
                                            <ActionTableCell value={value} TableName={TableName} Information={data} 
                                                changeValue={changeValue as (type: string, newValue: number) => void} setSearchBook={setSearchBook} searchBook={searchBook}
                                            />
                                        </Fragment>
                                    )
                                }
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <Pagination sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }} count={getCountPage() as number} page={page} onChange={handlePageChange}/>
        </Fragment>
    );
}

export default AllBookTable
