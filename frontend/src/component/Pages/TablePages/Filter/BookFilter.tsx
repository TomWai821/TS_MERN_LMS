import { FC, Fragment, useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import OptionFields from "../../../Manager/OptionFieldsManager";

// Context
import { useModal } from "../../../../Context/ModalContext";

// Another Modal
import CreateBookModal from "../../../Modal/Book/CreateBookModal";

// Models
import { FilterInterface } from "../../../../Model/TablePagesAndModalModel";
import { BookTableDataInterface } from "../../../../Model/BookTableModel";

// Data(CSS Syntax and dropdown data)
import { ItemToCenter } from "../../../../ArraysAndObjects/Style";
import { AllBookStatusOption, LoanBookStatusOption } from "../../../../ArraysAndObjects/TableArrays";
import { useAuthContext } from "../../../../Context/User/AuthContext";

const BookFilter: FC<FilterInterface> = (filterData) => 
{
    const {value, searchData, onChange, Search, resetFilter} = filterData;
    const bookData = searchData as unknown as BookTableDataInterface;

    const [optionVisiable, setOptionVisiable] = useState(false);
    const [actionMenu, openActionMenu] = useState<HTMLElement | null>(null);
    const { handleOpen } = useModal();
    const { IsAdmin, IsLoggedIn } = useAuthContext();

    const ActionMenu = 
    [
        {label: 'Reset Filter', clickEvent: resetFilter},
        {label: 'Create book', clickEvent: () => handleOpen(<CreateBookModal />)}
    ]

    const toggleCardVisibility = () => 
    {
        setOptionVisiable((prev) => !prev);
    };

    const handleActionMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        openActionMenu(actionMenu ? null : event?.currentTarget);
    };
    
    return (
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{ ...ItemToCenter, paddingBottom: '25px', alignItems: 'center' }}>
               
               {
                value === 0 ?
                    <Fragment>
                        <TextField label="Book Name" name="bookname" value={bookData.bookname} onChange={onChange} size="small" sx={{ width: '45%' }}/>
                        { 
                            IsLoggedIn() &&
                            <TextField label="Status" name="status" value={searchData.status} onChange={onChange} size="small" sx={{ marginLeft: '10px', width: '15%' }} select>
                            {
                                AllBookStatusOption.map((option, index) => 
                                (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))
                            }
                            </TextField>
                        }
                    </Fragment>
                    :
                    <Fragment>
                        <TextField label="Book Name" name="bookname" value={bookData.bookname} onChange={onChange} size="small" sx={{ width: '45%' }}/>
                        <TextField label="Status" name="status" value={searchData.status} onChange={onChange} size="small" sx={{ marginLeft: '10px', width: '15%' }} select>
                            {
                                LoanBookStatusOption.map((option, index) => 
                                (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))
                            }
                        </TextField> 
                    </Fragment>
               }
                

                <IconButton onClick={toggleCardVisibility}>
                    {optionVisiable ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>

                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={Search}>Search</Button>
                    { 
                        IsAdmin() && 
                        (
                            <Fragment>
                                {
                                value === 0 ? 
                                    <Button variant='contained' sx={{ marginLeft: '10px' }} onClick={handleActionMenu}>Action</Button>
                                    :
                                    <Button variant='contained' sx={{ marginLeft: '10px' }} onClick={resetFilter}>Reset Filter</Button>
                                }
                                <Menu open={Boolean(actionMenu)} anchorEl={actionMenu} onClose={handleActionMenu}>
                                {
                                    ActionMenu.map((action, index) =>(
                                        <MenuItem key={index}>
                                            <Typography onClick={action.clickEvent}>{action.label}</Typography>
                                        </MenuItem>
                                        )
                                    )
                                }
                                </Menu> 
                            </Fragment>
                        )
                    }
            </Box>

            <OptionFields value={value} type={"Book"} optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>
        </Box>
    );
}

export default BookFilter;
