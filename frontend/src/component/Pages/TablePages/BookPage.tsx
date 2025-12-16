import {  ChangeEvent, useCallback, useEffect, useState } from "react";
import { Box, TableContainer, Paper } from "@mui/material";

// Context
import { useBookContext } from "../../../Context/Book/BookContext";
import { useDefinitionContext } from "../../../Context/Book/DefinitionContext";

// Another Component
import BookFilter from "./Filter/BookFilter";
import CustomTab from "../../UIFragment/CustomTab";
import BookTabPanel from "./Tabs/BookTabPanel";
import TableTitle from "../../UIFragment/TableTitle";

// Model
import { BookSearchInterface } from "../../../Model/BookTableModel";

// Data (CSS SYntax and dropdown)
import { PageItemToCenter } from "../../../Data/Style";
import { BookTabLabel, PaginationOption } from "../../../Data/TableData";
import { useContactContext } from "../../../Context/Book/ContactContext";
import { useAuthContext } from "../../../Context/User/AuthContext";

const BookPage= () =>
{
    const { bookData, fetchBookWithFliterData, fetchLoanBookWithFliterData } = useBookContext();
    const { IsAdmin } = useAuthContext();
    const { definition } = useDefinitionContext();
    const { contact } = useContactContext();

    const SetTitle:string = IsAdmin() ? "Manage Books Record": "View Books";

    const [searchBook, setSearchBook] = useState<BookSearchInterface>({ bookname: "", username: "", language: "All", status:"All", genre: "All", author: "All", publisher: "All", finesPaid: "All" });
    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);

    const defaultValue = { bookname: "", username: "", language: "All", status:"All", genre: "All", author: "All", publisher: "All", finesPaid: "All" };

    const onChange = (event: ChangeEvent<HTMLInputElement>, index?: number) => 
    {
        const { name, value } = event.target;
        setSearchBook({ ...searchBook, [name]: value });
    };

    const changeValue = useCallback((type:string, newValue: number) =>
    {
        switch(type)
        {
            case "Tab":
                setTabValue(newValue);
                break;

            case "Pagination":
                setPaginationValue(newValue);
                break;
            
            default:
                break;
        }
    },[])

    const SearchBook = () => 
    {
        switch(tabValue)
        {
            case 0:
                const genreID = definition.Genre.find((genre) => genre.genre === searchBook.genre)?._id as string;;
                const languageID = definition.Language.find((language) => language.language === searchBook.language)?._id as string;
                const authorID = contact.Author.find((author) => author.author === searchBook.author)?._id as string;
                const publisherID = contact.Publisher.find((publisher) => publisher.publisher === searchBook.publisher)?._id as string;
                fetchBookWithFliterData(searchBook.bookname, searchBook.status, genreID, languageID, authorID, publisherID);
                break;

            case 1:
                fetchLoanBookWithFliterData("AllUser", searchBook.bookname, searchBook.username, searchBook.status, searchBook.finesPaid);
                break;
        }
    }

    const resetFilter = () => 
    {
        switch(tabValue)
        {
            case 0:
                fetchBookWithFliterData("All", "", "All", "All", "All", "All");
                break;

            case 1:
                fetchLoanBookWithFliterData("AllUser", "", "All", "All", "All");
                break;
        }
        setSearchBook(defaultValue);
    };

    useEffect(() => 
        { 
            if(!IsAdmin()) 
            { 
                setTabValue(0); 
            }
        },[IsAdmin]
    )
     
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={SetTitle} dataLength={bookData[tabValue].length}/>

            <BookFilter value={tabValue} onChange={onChange} searchData={searchBook} Search={SearchBook} resetFilter={resetFilter}/>

            <CustomTab value={tabValue} changeValue={changeValue} paginationValue={paginationValue} tabLabel={BookTabLabel}
                paginationOption={PaginationOption} type={"Book"}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <BookTabPanel value={tabValue} bookData={bookData} paginationValue={paginationValue} changeValue={changeValue} setSearchBook={setSearchBook} searchBook={searchBook}/>
            </TableContainer>
        </Box>
    );
}

export default BookPage