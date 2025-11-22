import { FC, Fragment } from "react"
import { Box, Card, MenuItem, TextField, Typography } from "@mui/material"

import { OptionFieldModel } from "../../Model/InputFieldModel";

const SearchOptionField:FC<OptionFieldModel> = ({...optionData}) =>
{
    const {optionVisiable, onChange, SearchField, searchData} = optionData;

    if (!optionVisiable) 
    {
        return null;
    }

    return(
        <Fragment>
            {optionVisiable && (
                <Card sx={{padding: '15px' }}>
                    <Typography>Options</Typography>
                    <Box sx={{ padding: '15px 20px', display: 'grid', justifyContent: 'center', alignItems: 'center', gap: '15px 50px', gridTemplateColumns: '10% 30% 10% 30%' }}>
                        {SearchField.map((field, index) => 
                            (
                                <Fragment key={index}>
                                    <Typography>{field.label}</Typography>
                                    <TextField name={field.name} value={(searchData as any)[field.name]}
                                        type={field.type} size="small" onChange={onChange} select={field.select} slotProps={field.slotProps ?? {}}>
                                        {
                                            field.select && field.options?.map((option, index) => 
                                            (
                                                <MenuItem key={index} value={option} sx={{height: '40px'}}>{option}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Fragment>
                            ))
                        }
                    </Box>
                </Card>
            )}
        </Fragment>
    )
}

export default SearchOptionField