import { FC, useContext } from "react";
import { Box, Typography } from "@mui/material";

// Context
import { useModal } from '../../../../Context/ModalContext';
import { useDefinitionContext } from "../../../../Context/Book/DefinitionContext";

// UI Fragment
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Template
import ModalTemplate from '../../../Templates/ModalTemplate';

// Data (CSS Synxax)
import { ModalBodySyntax, ModalSubTitleSyntax, ModalRemarkSyntax } from "../../../../ArraysAndObjects/Style";

// Models
import { CreateModalInterface } from "../../../../Model/ModelForModal";
import { DefinitionInterface } from "../../../../Model/ResultModel";

// Another Modal
import CreateDefinitionModal from "../../Definition/CreateDefinitionModal";
import { AlertContext } from "../../../../Context/AlertContext";


const CreateDefinitionConfirmModal:FC<CreateModalInterface> = (definationData) => 
{
    const {value, data} = definationData;
    const Data = data as DefinitionInterface;
    const type = value === 0 ? "Genre" : "Language";
 
    const { handleOpen, handleClose } = useModal();
    const { createDefinition } = useDefinitionContext();
    const alertContext = useContext(AlertContext);

    const returnCreateUserModal = () => 
    {
        handleOpen(<CreateDefinitionModal {...definationData}/>);
    }

    const createDefinitionData = async () => 
    {
        let response;

        switch(value)
        {
            case 0:
                response = createDefinition(type, Data.shortName, Data.genre as string);
                break;

            case 1:
                response = createDefinition(type, Data.shortName, Data.language as string);
                break;
        }

        if (alertContext && alertContext.setAlertConfig) 
        {
            if (await response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: `Create ${type} record successfully!`, open: true, onClose: () => alertContext.setAlertConfig(null) });
                setTimeout(() => { handleClose() }, 2000);
            } 
            else 
            {
                alertContext.setAlertConfig({ AlertType: "error", Message: `Failed to create ${type} record! Please try again later`, open: true, onClose: () => alertContext.setAlertConfig(null) });
            }
        }
    }

    return(
        <ModalTemplate title={`Create ${type} Confirmation`} width="400px" cancelButtonName={"No"} cancelButtonEvent={returnCreateUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalSubTitleSyntax}>Do you want to create this {type}?</Typography>
                {
                    value === 0 ? 
                    <Typography>Genre: {Data.genre !== "" ? Data.genre : "N/A"}</Typography>
                    :
                    <Typography>Language: {Data.language !== "" ? Data.language : "N/A"}</Typography>
                }
                <Typography>ShortName: {Data.shortName !== "" ? Data.shortName : "N/A"}</Typography>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={createDefinitionData} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default CreateDefinitionConfirmModal;
