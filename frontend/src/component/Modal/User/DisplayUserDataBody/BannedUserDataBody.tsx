import { FC, Fragment } from "react"
import { DisplayDataModalBody } from "../../../../Model/ModelForModal";
import { Avatar, Box, Typography } from "@mui/material";
import { CalculateDuration, CountDuration, TransferDateToString } from "../../../../Controller/OtherController";
import { UserResultDataInterface } from "../../../../Model/ResultModel";
import { displayAsColumn } from "../../../../Data/Style";
import { useAuthContext } from "../../../../Context/User/AuthContext";
import ExpandableTypography from "../../../UIFragment/ExpandableTypography";
import { setDataTextColor } from "../../../../Controller/SetTextController";

const BannedUserDataBody:FC<DisplayDataModalBody> = (BannedUserData) => 
{
    const {data} = BannedUserData;
    const {IsAdmin} = useAuthContext();
    const Data = data as UserResultDataInterface;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
            <Avatar src={Data.avatarUrl ?? "/broken-image.jpg"} sx={{ width: "100px", height: "100px" }} />
            <Typography sx={{fontSize: '24px', padding: '15px'}}>{Data.role}</Typography>
            <Box sx={{ display: 'grid', gap: '20px 50px', gridTemplateColumns: '100%'}}>
                <Typography>Username: {Data.username}</Typography>
                {
                    IsAdmin() && 
                    (
                        <Fragment>
                                <Typography>Gender: {Data.gender}</Typography>
                                <Typography>
                                    Status: <Box component={"span"} color={setDataTextColor(Data.bannedDetails?.status as string, "Unsuspend", "green", "red")}> {Data.bannedDetails?.status} </Box> 
                                    {Data.bannedDetails?.status === "Unsuspend" && `(Unsuspend At: ${TransferDateToString(Data.bannedDetails?.unSuspendDate as Date)})` }
                                </Typography>
                        </Fragment>
                    )
                }
                <Typography>Date: { !Data.bannedDetails?.dueDate || new Date(Data.bannedDetails?.dueDate).getTime() <= 0 ? "N/A" 
                    : `${TransferDateToString(Data.bannedDetails?.startDate as Date)} - ${TransferDateToString(Data.bannedDetails?.dueDate as Date)}` }
                </Typography>

                <Typography>Duration: { !Data.bannedDetails?.dueDate || new Date(Data.bannedDetails?.dueDate).getTime() <= 0 ? "Forever" 
                    : CalculateDuration(Data.bannedDetails?.startDate as Date, Data.bannedDetails?.dueDate as Date) }
                { 
                    IsAdmin() && Data.bannedDetails?.status === "Suspend" && Data.bannedDetails?.dueDate && new Date(Data.bannedDetails?.dueDate).getTime() > 0 && 
                    (
                        <Fragment> ({CountDuration(Data.bannedDetails?.dueDate as Date)} Days Left) </Fragment>
                    )
                }
                </Typography>

                <ExpandableTypography title={"Description"}> {Data.bannedDetails?.description}</ExpandableTypography>
            </Box>
        </Box>
    );
}

export default BannedUserDataBody