import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material'

// Context
import { useModal } from '../../Context/ModalContext'

// Models
import { ViewProfileModel } from '../../Model/InputFieldModel'
import { GetResultInterface } from '../../Model/ResultModel'
import { UserDataInterface } from '../../Model/UserTableModel'

// Controllers
import { FetchUserData } from '../../Controller/UserController/UserGetController'

// Data(CSS Syntax)
import { displayAsColumn, PageItemToCenter, PageTitleSyntax, ViewProfileButton } from '../../ArraysAndObjects/Style';
import { ViewProfileField } from '../../ArraysAndObjects/TextFieldsArrays';
import DisplayQRCodeModal from '../Modal/DisplayQRCodeModal'
import EditProfileDataModal from '../Modal/EditProfileDataModal'
import { useAuthContext } from '../../Context/User/AuthContext'

const ViewProfilePage = () => 
{
    const [Credentials, setCredentials] = useState<ViewProfileModel>({ email: "", gender: "", username: "", role: ""});
    const {handleOpen} = useModal();
    const {GetData} = useAuthContext();
    const authToken = GetData("authToken");

    const fetchUser = async () => 
    {
        if (authToken) 
        {
            try
            {
                const userData = await FetchUserData(undefined, authToken);

                if (userData) 
                {
                    console.log(userData);
                    updateCredentials(userData);
                }
            } 
            catch (error) 
            {
                console.log('Error while fetching user', error);
            }
        }

    };

    const updateCredentials = (userData: GetResultInterface) =>
    {
        const foundUser = Array.isArray(userData.foundUser) ? userData.foundUser[0] : userData.foundUser as UserDataInterface;

        setCredentials
        ( 
            {
                username: foundUser.username|| "", 
                gender: foundUser.gender || "",
                role: foundUser.role || "",
                email: foundUser.email || "",
            }
        );
    }

    const editUserData = () => 
    {
        handleOpen(<EditProfileDataModal/>);
    }

    const displayQRCode = () => 
    {
        handleOpen(<DisplayQRCodeModal username={Credentials.username} authToken={authToken as string}/>)
    }

    useEffect(() => 
    {
        fetchUser();
    }, []);

    return (
        <Box sx={PageItemToCenter}>
            <Card variant='outlined' sx={{ width: '600px', borderRadius: '25px' }}>
                <CardContent sx={{ padding: '3%' }}>
                    <Typography sx={ PageTitleSyntax }>Profile</Typography>
                    <Box sx={{...displayAsColumn, padding: '0 5% 0 5%', alignItems: 'center'}}>
                        <Avatar sx={{width: '150px', height: '150px'}}></Avatar>
                        {
                            ViewProfileField.map((field, index) => 
                            (
                                <Box key={index} sx={{ display: 'grid', width: '100%', gridTemplateColumns: '1fr 1fr', padding: '20px 0 20px 0'}}>
                                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{field.label}</Typography>
                                    <Typography sx={{ fontSize: '20px', textAlign: 'right' }}>{Credentials[field.name as keyof ViewProfileModel]}</Typography>
                                </Box>
                            ))
                        }
                    </Box>

                    <Box sx={{...PageItemToCenter, flexDirection: 'column', alignItems: 'center', mt: ViewProfileButton.marginTop}}>
                        <Button variant='contained' sx={{...ViewProfileButton}} onClick={displayQRCode}>Display QR Code</Button>
                        <Button variant='contained' sx={{...ViewProfileButton}} onClick={editUserData}>Edit Data</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
};

export default ViewProfilePage;

