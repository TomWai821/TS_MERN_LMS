import { Box,  Menu, Typography } from "@mui/material"

import { FC } from "react";
import { NavMenuInterface } from "../../Model/NavModel";
import { externalUserPage, adminPage, userPage } from "../../ArraysAndObjects/MenuArrays";
import CustomMenuItem from "../UIFragment/CustomMenuItem";
import { useAuthContext } from "../../Context/User/AuthContext";



const NavMenu:FC<NavMenuInterface> = ({AvatarSize, anchorElNav, handleNavMenu, NavSyntax}) => 
{
    const {GetData, IsLoggedIn, IsAdmin} = useAuthContext(); 
    const SetNavName = IsAdmin() ? "Manage" : "View";

    return(
        <Box sx={{ flexGrow: 1 }}>
            <Typography onClick={handleNavMenu} width={'60px'} sx={{ fontSize: 24, ml: '20px', '&:hover': { cursor: 'pointer', color: NavSyntax.color } }}>
            {SetNavName}
            </Typography>
                <Menu
                    sx={{ mt: AvatarSize }}
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={Boolean(anchorElNav)}
                    onClose={handleNavMenu}
                >
                {
                    !IsLoggedIn() ?  <CustomMenuItem pages={externalUserPage}/> : (GetData("role") === 'Admin' ? <CustomMenuItem pages={adminPage}/> : <CustomMenuItem pages={userPage}/>)
                }
                </Menu>
        </Box>
    )
}

export default NavMenu