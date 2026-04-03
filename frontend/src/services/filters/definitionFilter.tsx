import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDefinitionContext } from "../../Context/Book/DefinitionContext";


const defaultValue = {genre:"", language: ""};

export const useDefinitionFilter = (tabValue: number) =>
{
    const { fetchDefinitionDataWithFilterData } = useDefinitionContext();
    const [searchData, setSearchData] = useState({genre:"", language: ""});

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

    const resetFilter = useCallback(() => 
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
    },[tabValue, fetchDefinitionDataWithFilterData])

    useEffect(() =>
    {
        resetFilter()
    },[tabValue, resetFilter])

    return { searchData, onChange, SearchDefinition, resetFilter };
}