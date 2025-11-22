import {  ChangeEvent, useCallback, useEffect, useState } from "react";
import { Box, TableContainer, Paper } from "@mui/material";

// Another Component
import ContactFilter from "./Filter/ContactFilter";
import CustomTab from "../../UIFragment/CustomTab";
import TableTitle from "../../UIFragment/TableTitle";

// Data (CSS SYntax and dropdown)
import { PageItemToCenter } from "../../../ArraysAndObjects/Style";
import { ContactTabLabel, PaginationOption } from "../../../ArraysAndObjects/TableArrays";
import { useContactContext } from "../../../Context/Book/ContactContext";
import ContactTabPanel from "./Tabs/ContactTabPanel";
import { ChangePage } from "../../../Controller/OtherController";
import { useAuthContext } from "../../../Context/User/AuthContext";

const ContactPage= () =>
{
    const { contact, fetchContactDataWithFilterData } = useContactContext();
    const {IsAdmin} = useAuthContext();
    
    const [searchContact, setSearchContact] = useState({author: "", publisher: ""});
    const [paginationValue, setPaginationValue] = useState(10);
    const [tabValue, setTabValue] = useState(0);

    const defaultValue = {author: "", publisher: ""};
    const Title = ["Manage Author Record", "Manager Publisher Record"];

    const countLength = ()=> 
    {
        const dataLength = [contact.Author.length, contact.Publisher.length];
        return dataLength[tabValue];
    }

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

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setSearchContact({...searchContact, [name]: value});
    }

    const SearchContact = () => 
    {
        const title = ["Author", "Publisher"];
        fetchContactDataWithFilterData(title[tabValue], searchContact.author, searchContact.publisher);
    }

    const resetFilter = () => 
    {
        const title = ["Author", "Publisher"];
        fetchContactDataWithFilterData(title[tabValue], "", "");
        setSearchContact(defaultValue);
    }

    useEffect(() => 
    {
        if(!IsAdmin())
        {
            ChangePage('/');
        }
    },[IsAdmin])
    
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={Title[tabValue]} dataLength={countLength() as number}/>

            <ContactFilter value={tabValue} onChange={onChange} searchData={searchContact} Search={SearchContact} resetFilter={resetFilter}/>

            <CustomTab value={tabValue} changeValue={changeValue} 
                paginationValue={paginationValue} tabLabel={ContactTabLabel} paginationOption={PaginationOption} type={"Contact"}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <ContactTabPanel value={tabValue} contactData={contact} paginationValue={paginationValue}/>
            </TableContainer>
        </Box>
    );
}

export default ContactPage