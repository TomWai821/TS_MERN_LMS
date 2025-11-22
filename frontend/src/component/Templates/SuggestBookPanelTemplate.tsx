import { Avatar, Box, Typography } from "@mui/material"
import { FC, Fragment } from "react"
import { BookDataInterface, LoanBookInterface } from "../../Model/ResultModel"
import { TransferDateToISOString } from "../../Controller/OtherController";
import { useModal } from "../../Context/ModalContext";
import DisplayBookDataModal from "../Modal/Book/DisplayBookDataModal";

const SuggestBookPanelTemplate:FC<{value:number, title:string, data:BookDataInterface[] | LoanBookInterface[]}> = (suggestBookPanelData) => 
{
    const { value, title, data } = suggestBookPanelData;
    const { handleOpen } = useModal();

    const PublishPanelSyntax = 
    {
        padding: '20px', display: 'grid', justifyContent: 'center', 
        alignItems: 'center', gap: '15px 30px', gridTemplateColumns: 'repeat(8, 10%)', 
        backgroundColor: 'lightgray', borderRadius: '10px'
    }

    const ImageSyntax = { width: "175px", height: "250px" }

    const PanelHoverSyntax = { backgroundColor: 'white', opacity: '60%', cursor: 'pointer', borderRadius: '10px'}

    const PanelSyntax = {display: 'grid', textAlign: 'center', justifyContent: 'center', width: "200px", height: "320px", padding: '10px 0'}

    const isBookDataInterface = (book:any): book is BookDataInterface => 
    {
        return 'image' in book && 'bookname' in book 
    }

    const openDisplayBookDataModal = (data: BookDataInterface | LoanBookInterface) => 
    {
        handleOpen(<DisplayBookDataModal position={"mainPage"} value={0} data={data}/>);
    }
    
    return(
        data.length > 0 ?
        <Box sx={{padding: '20px 0'}}>
            <Typography sx={{fontSize: '24px', paddingBottom: '10px'}}>{title}</Typography>
            <Box sx={PublishPanelSyntax}>
                {
                    data.map((book, index) => 
                    (
                        <Box key={index} sx={{ ...PanelSyntax, "&:hover": PanelHoverSyntax }} onClick={() => openDisplayBookDataModal(book)}>
                            {
                                isBookDataInterface(book) ? 
                                (
                                    <Fragment>
                                        <Avatar src={book.image?.url} alt="Preview" variant="rounded"sx={ImageSyntax} />
                                        <Typography sx={{width: "175px"}}>{book.bookname}</Typography>
                                        {value === 1 ?
                                            <Typography>{`(${TransferDateToISOString(book.publishDate as Date)})`}</Typography>
                                            :
                                            <Typography>{`(${book.genreDetails.genre})`}</Typography>
                                        }
                                    </Fragment>
                                ) 
                                : 
                                (
                                    <Fragment>
                                        <Avatar src={book.bookDetails?.image?.url} alt="Preview" variant="rounded" sx={ImageSyntax}/>
                                        <Typography sx={{width: "175px"}}>{book.bookDetails?.bookname}</Typography>
                                        <Typography>{`(${book.count} Loans)`}</Typography>
                                    </Fragment>
                                )
                            }
                        </Box>
                    ))
                }
            </Box>
        </Box>:<></>
    )
}

export default SuggestBookPanelTemplate