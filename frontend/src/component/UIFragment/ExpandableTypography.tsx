import { FC, useLayoutEffect, useRef, useState } from "react";
import { BookDescriptionDisplayFormat, displayAsRow } from "../../Data/Style";
import { Box, IconButton, Typography } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ExpandableTypographyInterface } from "../../Model/ModelForModal";

const ExpandableTypography:FC<ExpandableTypographyInterface> = ({title, children}) => 
{

    const [displayFullDescription, setDisplayFullDescription] = useState(false);
    const [displayAmount, setDisplayAmount] = useState(5);
    const [overFlow, setOverFlow] = useState("hidden");

    const descriptionRef = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState<number>(0);

    const countDescriptionLength = () => 
    {
        if (descriptionRef.current) 
        {
            const computedStyle = window.getComputedStyle(descriptionRef.current);
            const lineHeight = parseFloat(computedStyle.lineHeight);
            const height = descriptionRef.current.getBoundingClientRect().height;
            const calculatedLines = Math.round(height / lineHeight);
            setLineCount(calculatedLines);
        }
    };

    const toggleDescriptionDisplay = () => 
    {
        if(displayFullDescription === false)
        {
            setDisplayFullDescription(true);
            setDisplayAmount(10);
            setOverFlow("auto");
            return;
        }
        
        setDisplayFullDescription(false);
        setDisplayAmount(5);
        setOverFlow("hidden");
    }

    useLayoutEffect(() => 
    {
        countDescriptionLength();
    }, [children, displayFullDescription])

    return(
        <Box sx={{ maxWidth: '350px', display: 'inline-block'}}>
            <Box sx={{...displayAsRow, alignItems: 'center'}}>
                <Typography>{title}:</Typography>
                {lineCount > 4 && 
                    (
                    <IconButton onClick={toggleDescriptionDisplay}>
                        {displayFullDescription ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                    )
                }
            </Box>
            <Typography ref={descriptionRef} sx={{...BookDescriptionDisplayFormat, WebkitLineClamp: displayAmount, overflow: overFlow}}>{children}</Typography>
        </Box>
    )
}

export default ExpandableTypography