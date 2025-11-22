import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

// Context
import { useDefinitionContext } from "../../../Context/Book/DefinitionContext";

// Useful function
import { ChangePage } from "../../../Controller/OtherController";

// data (CSS Syntax)
import { PageItemToCenter } from "../../../ArraysAndObjects/Style";

import { useAuthContext } from "../../../Context/User/AuthContext";

import { TabProps } from "../../../Controller/OtherUsefulController";
import { DefinitionTabLabel } from "../../../ArraysAndObjects/TableArrays";
import TableTitle from "../../UIFragment/TableTitle";
import DefinitionFilter from "./Filter/DefinitionFilter";
import ChipBody from "../../Templates/ChipBodyTemplate";
import CustomTabPanel from "../../UIFragment/CustomTabPanel";

const DefinitionPage  = () => 
{
    const {IsAdmin} = useAuthContext();
    const {definition, fetchDefinitionDataWithFilterData} = useDefinitionContext();

    const [searchData, setSearchData] = useState({genre:"", language: ""});
    const [tabValue, setTabValue] = useState(0);

    const defaultValue = {genre:"", language: ""};

    const Title = tabValue === 0 ? "Genre" : "Language";

    const changeValue = useCallback((event: React.SyntheticEvent, newValue: number) =>
    {
        setTabValue(newValue);
    },[])

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setSearchData({...searchData, [name]: value});
    }

    const SearchDefinition = () => 
    {
        switch(tabValue)
        {
            case 0:
                fetchDefinitionDataWithFilterData("Genre", searchData.genre);
                break;
            
            case 1:
                fetchDefinitionDataWithFilterData("Language", searchData.language);
                break;
        }
    }

    const resetFilter = () => 
    {
        switch(tabValue)
        {
            case 0:
                fetchDefinitionDataWithFilterData("Genre", "");
                break;
            
            case 1:
                fetchDefinitionDataWithFilterData("Language", "");
                break;
        }
        setSearchData(defaultValue);
    }

    useEffect(() => 
    {
        if(!IsAdmin())
        {
            ChangePage('/');
        }
    },[IsAdmin])

    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>

            <TableTitle title={`Manage ${Title} Record`} dataLength={definition[Title].length}/>

            <DefinitionFilter searchData={searchData} value={tabValue} onChange={onChange} Search={SearchDefinition} resetFilter={resetFilter}/>

            <Tabs value={tabValue} onChange={changeValue} sx={{paddingBottom: '50px', width: '500px'}}>
                {
                    DefinitionTabLabel.map((tab, index) => 
                    (
                        <Tab key={index} label={tab.label} {...TabProps(index)}/>
                    ))
                }
            </Tabs>
            
            <CustomTabPanel index={tabValue} value={0}>
                <ChipBody value={tabValue} title={Title} data={definition.Genre}/>
            </CustomTabPanel>

            <CustomTabPanel index={tabValue} value={1}>
                <ChipBody value={tabValue} title={Title} data={definition.Language}/>
            </CustomTabPanel>
        </Box>
    );
}

export default DefinitionPage