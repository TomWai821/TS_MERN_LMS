import { useState } from "react"

type ConfigDataType = 'tabValue' | 'page' | 'paginationValue';

export const usePageConfigData = (data: any) => 
{
    const [tabValue, setTabValue] = useState<number>(0);
    const [page, setPage] = useState<number[]>([1, 1]);
    const [paginationValue, setPaginationValue] = useState<number[]>([10, 10]);

    const setPageConfigData = (name: ConfigDataType, newValue: number): void => 
    {
        switch(name)
        {
            case 'tabValue':
                setTabValue(newValue);
                break;

            case 'page':
                setPage(prev => 
                {
                    const updated = [...prev];
                    updated[tabValue] = newValue;
                    return updated
                });
                break;

            case 'paginationValue':
                setPaginationValue(prev => 
                {
                    const updated = [...prev];
                    updated[tabValue] = newValue;
                    return updated
                })
                break;
        }
    }

    const getPageConfigData = (name: ConfigDataType): number => 
    {
        switch(name)
        {
            case 'tabValue':
                return tabValue;

            case 'page':
                return page[tabValue];

            case 'paginationValue':
                return paginationValue[tabValue];
        }
    }

    const getPageCountAndData = (): {total:number, countPage: number, paginatedData: any[]} => 
    {
        const total = data[tabValue].length;
        const startIndex = (page[tabValue] - 1) * paginationValue[tabValue];
        const endIndex = startIndex + paginationValue[tabValue];

        const paginatedData = data[tabValue].slice(startIndex, endIndex);
        const countPage = Math.ceil(data.length / paginationValue[tabValue]);

        return {total, countPage, paginatedData};
    }

    return {setPageConfigData, getPageConfigData, getPageCountAndData};
}