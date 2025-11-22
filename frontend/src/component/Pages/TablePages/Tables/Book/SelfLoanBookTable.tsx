import { Avatar, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ItemToCenter } from "../../../../../ArraysAndObjects/Style";
import { FC, Fragment, useState } from "react";
import { SelfLoanBookTableHeader } from "../../../../../ArraysAndObjects/TableArrays";
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import { LoanBookInterface } from "../../../../../Model/ResultModel";
import { BookRecordTableInterface } from "../../../../../Model/BookTableModel";
import { TransferDateToISOString } from "../../../../../Controller/OtherController";
import { setDataTextColor, setLoanBookDataTextColor } from "../../../../../Controller/SetTextController";

const SelfLoanBookTable:FC<BookRecordTableInterface> = (DataForAllUserTable) => 
{
    const {value, bookData, paginationValue} = DataForAllUserTable;
    const LoanBookData = bookData[value] as LoanBookInterface[];
    const TableName = "Book";

    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = LoanBookData.slice(startIndex, endIndex);
    const count = Math.ceil(LoanBookData.length / paginationValue);
    
    const getCountPage = () : void | number => 
    {
        return LoanBookData.length > paginationValue ? count + 1 : count;
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
                        {SelfLoanBookTableHeader.map((header, index) =>
                            (
                                <TableCell key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    
                    {
                        paginatedData.map((data, index) => 
                            (
                                <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                    <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                    
                                    <ContentTableCell TableName={TableName} value={1} Information={data}>
                                        <Avatar src={data.bookDetails?.image?.url} alt="Preview" variant="rounded" sx={{ width: "150px", height: "225px" }}/>
                                    </ContentTableCell>

                                    <ContentTableCell TableName={TableName} value={1} Information={data}>{data.bookDetails?.bookname}</ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={1} Information={data}>{TransferDateToISOString(data.loanDate as Date)}</ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={1} Information={data}>{TransferDateToISOString(data.dueDate as Date)}</ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={1} Information={data} textColor={setLoanBookDataTextColor(data.status as string)}>{data.status}</ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={1} Information={data}>{data.returnDate === null ? "N/A" : TransferDateToISOString(data.returnDate as Date)}</ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={1} Information={data} textColor={setDataTextColor(data.finesPaid as string, "Not Paid", "red", "green")}>
                                        { data.fineAmount !== 0 && data.finesPaid !== "Not Fine Needed" ? "Not Paid" : data.finesPaid }
                                    </ContentTableCell>
                                    
                                    <ContentTableCell TableName={TableName} value={1} Information={data}>
                                        HKD$ { data.fineAmount }
                                    </ContentTableCell>
                                </TableRow>
                            )
                        )
                    }
                    
                </TableBody>
            </Table>

            <Pagination sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }} count={getCountPage() as number} page={page} onChange={handlePageChange}/>
        </Fragment>
    );
}

export default SelfLoanBookTable