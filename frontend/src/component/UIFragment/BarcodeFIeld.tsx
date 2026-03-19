import { Box, Typography } from "@mui/material";
import { FC } from "react";
import Barcode from "react-barcode";

interface BarcodeFieldInterface
{
    label: string,
    value: string
}

const BarcodeField:FC<BarcodeFieldInterface> = (data) => 
{
    const {label, value} = data;

    if (value === "N/A") return null;

    return (
        <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: '500' }}>{label}:</Typography>
            <Box sx={{ mt: 1, p: 1, border: '1px dashed #ccc', display: 'inline-block' }}>
                <Barcode value={value} width={2} height={60} background="transparent"/>
            </Box>
        </Box>
    );
};

export default BarcodeField