import { FC, Fragment } from "react"

// Tabs
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// Another Component
import AllUserTable from "../Tables/User/AllUserTable"
import BannedUserTable from "../Tables/User/SuspendUserTable"

// Model
import { UserDataTableInterface } from "../../../../Model/UserTableModel"

const UserTabPanel:FC<UserDataTableInterface> = (userTableData) =>
{
    const {value, userData, paginationValue, changeValue, setSearchUserData, searchUserData} = userTableData
    
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <AllUserTable userData={userData} value={value} paginationValue={paginationValue} changeValue={changeValue} setSearchUserData={setSearchUserData} searchUserData={searchUserData}/>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={value}>
                <BannedUserTable userData={userData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default UserTabPanel