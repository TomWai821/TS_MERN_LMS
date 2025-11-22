import { FC, useContext } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { UserActionTableCellInterface } from "../../../../../Model/TablePagesAndModalModel";
import { BookDataInterface } from "../../../../../Model/ResultModel";

import { AlertContext } from "../../../../../Context/AlertContext";
import { useSelfBookRecordContext } from "../../../../../Context/Book/SelfBookRecordContext";

const ActionTableCellForUser:FC<UserActionTableCellInterface> = (actionTableCellData) => 
{
    const {BookRecordForUser, favouriteBook, unfavouriteBook} = useSelfBookRecordContext();
    
    const {Information} = actionTableCellData;

    const alertContext = useContext(AlertContext);

    const isFavourite = BookRecordForUser[1].find((favouriteBook) => favouriteBook.bookDetails?._id === (Information as BookDataInterface)._id);
    const FavouriteID = BookRecordForUser[1].find((favouriteBook) => favouriteBook.bookDetails?._id === (Information as BookDataInterface)._id as string)?._id;

    const FavouriteHandler = async () => 
    {
        let response = isFavourite ? unfavouriteBook(FavouriteID as string) : favouriteBook((Information as BookDataInterface)._id); 
        const favouriteText = isFavourite ? "Unfavourite" : "Favourite";

        if (alertContext && alertContext.setAlertConfig) 
        {
            if (await response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: `${favouriteText} successfully!`, open: true, onClose: () => alertContext.setAlertConfig(null) });
            } 
            else 
            {
                alertContext.setAlertConfig({ AlertType: "error", Message: `Failed to ${favouriteText}! Please try again`, open: true, onClose: () => alertContext.setAlertConfig(null) });
            }
        }
    }

    const FavouriteIconSyntax = () => 
    {
        return isFavourite ? { "&:hover": { backgroundColor: 'lightGray' }, color: 'gold' } : { "&:hover": { backgroundColor: 'lightGray' } };
    }

    return(
        <TableCell sx={{marginLeft: '20px'}}>
            <Tooltip title={isFavourite ? "Unfavourite" : "Favourite"} arrow>
                <IconButton onClick={FavouriteHandler} sx={FavouriteIconSyntax}>
                    {isFavourite ? <StarIcon/>: <StarBorderIcon />}
                </IconButton>
            </Tooltip>
        </TableCell>
    );
}

export default ActionTableCellForUser;