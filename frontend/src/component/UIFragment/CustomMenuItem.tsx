import { FC, Fragment } from "react"
import { ListItemIcon, MenuItem, Typography } from "@mui/material"

import { MenuItemInterface } from "../../Model/NavModel";
import { MenuItemSyntax, NavSyntax } from "../../ArraysAndObjects/Style";

const CustomMenuItem:FC<MenuItemInterface> = ({pages}) => 
{
    return(
        <Fragment>
            {pages.map((page, index) => (
                    <MenuItem key={index} sx={{MenuItemSyntax, NavSyntax}} onClick={page.clickEvent}>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <Typography width={'100%'}>{page.name}</Typography>
                    </MenuItem>
                ))
            }
        </Fragment>
    );
}

export default CustomMenuItem;