import { FC, useEffect, useState } from "react"
import { Avatar, Box, Tab, Tabs } from "@mui/material";

import { DisplayDataModalBody } from "../../../../Model/ModelForModal"

import { BookImageFormat, displayAsRow} from "../../../../Data/Style";
import { BookDataInterface, GetResultInterface, LoanBookInterface } from "../../../../Model/ResultModel";
import { TransferDateToISOString } from "../../../../Controller/OtherController";

import { BookDataTabLabel } from "../../../../Data/TableData";
import CustomTabPanel from "../../../UIFragment/CustomTabPanel";
import BookDataBody from "./ModalBody/BookDataBody";
import GoogleBookDataBody from "./ModalBody/GoogleBookDataBody";
import { TabProps } from "../../../../Controller/OtherUsefulController";
import { useAuthContext } from "../../../../Context/User/AuthContext";

const AllBookDataBody:FC<DisplayDataModalBody> = (AllUserData) => 
{
    const {IsLoggedIn} = useAuthContext();
    const {data} = AllUserData;
    const Data = data as BookDataInterface;
    const LoanData = data as LoanBookInterface;

    const imageUrl = Data.image?.url || LoanData.bookDetails?.image?.url;
    const descriptionData = Data.description || LoanData.bookDetails?.description;
    const status = Data.status || LoanData.bookDetails?.status;

    const [externalBookData, setExternalBookData] = useState({averageRating:  "N/A", ratingsCount: "N/A", categories: "N/A", listPrice: "N/A", retailPrice: "N/A", ISBN_13_Code: "N/A", ISBN_10_Code: "N/A"});
    const [tabValue, setTabValue] = useState(0);

    const RatingAsNumber = Number.parseInt(externalBookData.averageRating);

    const changeTabValue = (event: React.SyntheticEvent, newValue: number) =>
    {
        setTabValue(newValue);
    }

    const getBookDataFromExternal = async () => 
    {
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
        const baseUrl = process.env.REACT_APP_GOOGLE_BOOKS_BASE_URL; 
        const bookName = Data.bookname || LoanData.bookDetails?.bookname;
        const author = Data.authorDetails?.author || LoanData.authorDetails?.author;
        const query = `${bookName} inauthor:${author}`;
        const url = `${baseUrl}?q=${query}&key=${apiKey}`;

        const response = await fetch(url);
        const result = await response.json() as GetResultInterface;

        if (result.items && result.items.length > 0) 
        {
            const book = result.items[0];
            const volumeInfo = book.volumeInfo || {};
            const saleInfo = book.saleInfo || {};
        
            const saleability = saleInfo.saleability;
        
            const externalBookData = 
            {
                averageRating: volumeInfo.averageRating ? `${volumeInfo.averageRating} (From Google Books)` : "N/A",
                ratingsCount: volumeInfo.ratingsCount ? `${volumeInfo.ratingsCount}` : "N/A",
                categories: volumeInfo.categories ? `${volumeInfo.categories}` : "N/A",
                saleability: saleability || "N/A",
                listPrice: "N/A",
                retailPrice: "N/A",
                ISBN_13_Code: volumeInfo.industryIdentifiers?.find(identifier => identifier.type === "ISBN_13")?.identifier as string || "N/A",
                ISBN_10_Code: volumeInfo.industryIdentifiers?.find(identifier => identifier.type === "ISBN_10")?.identifier as string || "N/A"
            };
        
            if (saleability !== "NOT_FOR_SALE") 
            {
                externalBookData.listPrice = saleInfo.listPrice?.amount ? `${saleInfo.listPrice.currencyCode}$${saleInfo.listPrice.amount}` : "N/A";
                externalBookData.retailPrice = saleInfo.retailPrice?.amount ? `${saleInfo.retailPrice.currencyCode}$${saleInfo.retailPrice.amount}` : "N/A";
            }
        
            setExternalBookData(externalBookData);
        }

        return result;
    }

    const BookData:Record<string, {label:string, value:any}> =
    {
        "bookname": { label: "Bookname", value: Data.bookname || LoanData.bookDetails?.bookname},
        "genre": { label: "Genre", value: Data.genreDetails?.genre || LoanData.genreDetails?.genre },
        "language": { label: "Language", value: Data.languageDetails?.language || LoanData.languageDetails?.language },
        "author": { label: "Author", value: Data.authorDetails?.author || LoanData.authorDetails?.author },
        "publisher": { label: "Publisher", value: Data.publisherDetails?.publisher || LoanData.publisherDetails?.publisher },
        "publishDate": { label: "Publish Date", value: Data.publishDate ? TransferDateToISOString(Data.publishDate as Date) : TransferDateToISOString(LoanData.bookDetails?.publishDate as string) },     
    };

    useEffect(() => 
    {
        getBookDataFromExternal();
    },[])
    
    return(
        <Box>
            {
                IsLoggedIn() && 
                <Tabs value={tabValue} onChange={changeTabValue} sx={{paddingBottom: '50px', width: '500px'}}>
                    {
                        BookDataTabLabel.map((tab, index) => 
                        (
                            <Tab key={index} label={tab.label} {...TabProps(index)}/>
                        ))
                    }
                </Tabs>
            }
            
            <Box sx={{...displayAsRow, justifyContent: 'space-between', width: '500px'}}>
                <Avatar src={imageUrl} alt="Preview" variant="rounded" sx={{...BookImageFormat, paddingTop: '50px'}}/>
                
                <CustomTabPanel index={tabValue} value={0}>
                    <BookDataBody BookData={BookData} status={status as string} descriptionData={descriptionData}/>
                </CustomTabPanel>
               
                <CustomTabPanel index={tabValue} value={1}>
                    <GoogleBookDataBody externalBookData={externalBookData} RatingAsNumber={RatingAsNumber}/>
                </CustomTabPanel>
            </Box>
        </Box>
    );
}

export default AllBookDataBody