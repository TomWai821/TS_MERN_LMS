import { FC, useContext, useEffect, useState } from "react"
import ModalTemplate from "../../../Templates/ModalTemplate"
import { EditModalInterface } from "../../../../Model/ModelForModal"
import EditContactModal from "../../Contact/EditContactModal";
import { useModal } from "../../../../Context/ModalContext";
import { useContactContext } from "../../../../Context/Book/ContactContext";
import { Box, Typography } from "@mui/material";
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Data/Style";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import { ContactInterface } from "../../../../Model/ResultModel";
import { AlertContext } from "../../../../Context/AlertContext";

const EditContactConfirmModal:FC<EditModalInterface> = (data) => 
{
    const { value, compareData, editData } = data;
    const { handleOpen, handleClose } = useModal();
    const { editContactData } = useContactContext();
    const alertContext = useContext(AlertContext);

    const [differences, setDifferences] = useState<string[]>([]);
    const type = value === 0 ? "Author" : "Publisher";

    const returnEditDefinitionModal = () => 
    {
        handleOpen(<EditContactModal value={value} editData={editData} compareData={compareData}/>);
    }

    const editDefinitionAction = async () => 
    {
        let response;

        switch(value)
        {
            case 0:
                response = editContactData(type, compareData._id, editData.author, detectNullData(editData.phoneNumber), detectNullData(editData.email));
                break;

            case 1:
                response = editContactData(type, compareData._id, editData.publisher, detectNullData(editData.phoneNumber), detectNullData(editData.email));
                break;
        }

        if (alertContext && alertContext.setAlertConfig) 
        {
            if (await response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: `Edit ${type} record successfully!`, open: true, onClose: () => alertContext.setAlertConfig(null) });
                setTimeout(() => { handleClose() }, 2000);
            } 
            else 
            {
                alertContext.setAlertConfig({ AlertType: "error", Message: `Failed to edit ${type} record! Please try again later`, open: true, onClose: () => alertContext.setAlertConfig(null) });
            }
        }
    }

    const detectNullData = (data:string) =>
    {
        return data === "" ? data : "N/A";
    }

    const compareDifference = (editData: ContactInterface, compareData: ContactInterface) => 
    {
        let ignoreList: string | string[] = [];

        switch(value)
        {   
            case 0:
                ignoreList = ["publisher"];
                break;

            case 1:
                ignoreList = ["author"];
                break;
        }

        const newDifferences = [];
        for(const key in editData)
        {
            if(ignoreList.includes(key))
            {
                continue;
            }

            if(editData[key as keyof ContactInterface] !== compareData[key as keyof ContactInterface])
            {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

                if(editData[key as keyof ContactInterface] !== "")
                {
                    newDifferences.push(`${capitalizedKey}: ${compareData[key as keyof ContactInterface]} -> ${editData[key as keyof ContactInterface]}`);
                }
                else
                {
                    newDifferences.push(`${capitalizedKey}: ${compareData[key as keyof ContactInterface]} -> N/A`);
                }

            }
        }
        setDifferences(newDifferences);
    }

    useEffect(() => 
    {
        compareDifference(editData as ContactInterface, compareData as ContactInterface);
    },[editData, compareData]);

    return(
        <ModalTemplate title={`Edit ${type} Record`} width="400px" cancelButtonName={"Exit"} cancelButtonEvent={returnEditDefinitionModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{`Do you want to edit this ${type} record?`}</Typography>
                <Typography sx={ModalRemarkSyntax}>Changes:</Typography>
                
                {
                    differences.length > 0 ? differences.map((difference, index) => 
                        (
                            <Typography key={index}>{difference}</Typography>
                        )):
                   <Typography>- "No Change detected"</Typography>
                }

                <Typography sx={ModalRemarkSyntax}>Please ensure this information is correct</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={editDefinitionAction} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    )
}

export default EditContactConfirmModal