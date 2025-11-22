import { FC } from "react";

import { ActionTableCellInterface } from "../../Model/TablePagesAndModalModel";
import ActionTableCellForUser from "../Pages/TablePages/Tables/TableCell/ActionTableCellForUser";
import ActionTableCellForAdmin from "../Pages/TablePages/Tables/TableCell/ActionTableCellForAdmin";
import { useAuthContext } from "../../Context/User/AuthContext";

const ActionTableCellManager: FC<ActionTableCellInterface> = (tableCellData) => 
{
    const { value, TableName, Information, changeValue, setSearchBook, searchBook, setSearchUserData, searchUserData } = tableCellData;
    const {IsAdmin} = useAuthContext();

    return (
        IsAdmin() ? 
            <ActionTableCellForAdmin value={value} TableName={TableName} Information={Information} changeValue={changeValue} setSearchBook={setSearchBook} 
                searchBook={searchBook} setSearchUserData={setSearchUserData} searchUserData={searchUserData}/> 
            : 
            <ActionTableCellForUser Information={Information}/>
    );
}

export default ActionTableCellManager;
