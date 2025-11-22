import { ChangeEvent, FC, useState } from 'react'
import { MenuItem, TextField, Box } from '@mui/material';

// UI Fragment
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import EditUserConfirmModal from '../Confirmation/User/EditUserConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { UserResultDataInterface } from '../../../Model/ResultModel';
import { UserDataInterface } from '../../../Model/UserTableModel';
import { EditModalInterface } from '../../../Model/ModelForModal';
import { ModalBodySyntax } from '../../../ArraysAndObjects/Style';
import { EditUserInputField } from '../../../ArraysAndObjects/TextFieldsArrays';
import { DataValidateField } from '../../../Controller/ValidateController';

const EditUserModal:FC<EditModalInterface> = (editModalData) => 
{
    const {value, editData, compareData} = editModalData;
    const {handleOpen} = useModal();
    
    const {_id, username, email, role, status, gender} = editData as UserResultDataInterface;
    
    const [user, setUser] = useState<UserResultDataInterface>({_id: _id, username: username, email:email, role:role, status:status, gender:gender});

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({username: "", email: "", genre: "", role: "", status: "", gender: ""});
    const [helperTexts, setHelperText] = useState({username: "", email: "", genre: "", role: "", status: "", gender: ""});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setUser({...user, [name] : value})
    }

    const HandleDataValidate = async () => 
    {
        let validationPassed = true;
        const newErrors = { ...errors };
        const newHelperTexts = { ...helperTexts };
        setIsSubmitted(true);
    
        Object.keys(user).forEach((field) => 
        {
            if(["_id", "gender", "role", "status"].includes(field))
            {
                return;
            }

            const { helperText, error, success } = DataValidateField(field, user[field as keyof UserDataInterface] as string);
            newHelperTexts[field as keyof typeof newHelperTexts] = helperText;
            newErrors[field as keyof typeof newErrors] = error;
    
            if(!success)
            {
                validationPassed = false;
            }

            console.log({ helperText, error, success })
        });
    
        setHelperText(newHelperTexts);
        setErrors(newErrors);

        if(validationPassed)
        {
            handleOpen(<EditUserConfirmModal value={value} editData={user} compareData={compareData} />)
        }
    }
    
    
    return(
        <ModalTemplate title={"Edit User Record"} width="400px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    EditUserInputField.map((field, index) => (
                        <TextField key={index} label={field.label} name={field.name} value={user[field.name as keyof UserDataInterface]}
                            type={field.type} size="small" onChange={onChange} select={field.select} 
                            helperText={isSubmitted && helperTexts[field.name as keyof typeof helperTexts]}
                            error={isSubmitted && errors[field.name as keyof typeof errors] !== ""}>
                            {
                                field.select && field.options.map((option, index) => 
                                (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))  
                            }
                        </TextField>
                    ))   
                }
            </Box>

            <ModalConfirmButton clickEvent={HandleDataValidate} name={"Edit"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditUserModal;