import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { ChildProps, DefinatonProps } from "../../Model/ContextAndProviderModel";

import { DefinitionInterface, DefinitionState, GetResultInterface } from "../../Model/ResultModel";
import { CreateDefinitionData, DeleteDefinitionData, EditDefinitionData, GetDefinition } from "../../Controller/BookController/DefinitionController";

import { useAuthContext } from "../User/AuthContext";

const DefinitionContext = createContext<DefinatonProps | undefined>(undefined);

export const DefinitionProvider:FC<ChildProps> = ({children}) => 
{
    const {GetData} = useAuthContext();
    const [definition, setDefinition] = useState<DefinitionState>(
        {
            Genre:[],
            Language:[]
        }
    );
    const authToken = GetData("authToken") as string;

    const fetchAllDefinition = useCallback(async () => 
    {
        const [getGenreData, getLanguageData] = await Promise.allSettled([GetDefinition("Genre"), GetDefinition("Language")])

        if(getGenreData.status === "fulfilled" && getGenreData.value)
        {
            const GenreResponse = getGenreData.value;
            const GenreData: GetResultInterface = await GenreResponse.json();

            if(Array.isArray(GenreData.foundDefinition as DefinitionInterface[]))
            {
                setDefinition((prev) => ({...prev, Genre:GenreData.foundDefinition as DefinitionInterface[]}));
            }
        }
        
        if(getLanguageData.status === "fulfilled" && getLanguageData.value)
        {
            const LanguageResponse = getLanguageData.value;
            const LanguageData: GetResultInterface = await LanguageResponse.json();

            if(Array.isArray(LanguageData.foundDefinition as DefinitionInterface[]))
            {
                setDefinition((prev) => ({...prev, Language:LanguageData.foundDefinition as DefinitionInterface[]}));
            }
        }    
    }
    ,[])

    const fetchDefinitionDataWithFilterData = useCallback(async (type:string, data?:string) => 
    {
        const getData = await GetDefinition(type, data);
    
        if((getData as Response).ok)
        {
            const DefinitionData: GetResultInterface = await (getData as Response).json();

            if(Array.isArray(DefinitionData.foundDefinition as DefinitionInterface[]))
            {
                switch(type)
                {
                    case "Genre":
                        setDefinition((prev) => ({...prev, Genre:DefinitionData.foundDefinition as DefinitionInterface[]}));
                        break;
        
                    case "Language":
                        setDefinition((prev) => ({...prev, Language:DefinitionData.foundDefinition as DefinitionInterface[]}));
                        break;
                }
            }
        }
    }
    ,[])

    const createDefinition = useCallback(async (type:string, shortName:string, detailsName:string) => 
    {
        const result: Response = await CreateDefinitionData(type, authToken, shortName, detailsName);

        if(result)
        {
            fetchAllDefinition();
        }
        return result;
    }
    ,[fetchAllDefinition, authToken])

    const editDefinition = useCallback( async (type:string, id:string, shortName:string, detailsName:string) => 
    {
        const result: Response = await EditDefinitionData(type, authToken, id, shortName, detailsName);

        if(result)
        {
            fetchAllDefinition();
        }
        return result;
    }
    ,[fetchAllDefinition, authToken])

    const deleteDefinition = useCallback(async (type:string, id:string) => 
    {
        const result: Response = await DeleteDefinitionData(type, authToken, id);

        if(result)
        {
            fetchAllDefinition();
        }
        return result;
    }
    ,[fetchAllDefinition, authToken])

    useEffect(() => 
    {
        fetchAllDefinition();
    }
    ,[fetchAllDefinition])

    return (
        <DefinitionContext.Provider value={{ definition, fetchAllDefinition, fetchDefinitionDataWithFilterData, createDefinition, editDefinition, deleteDefinition}}>
            {children}
        </DefinitionContext.Provider>
    );
}

export const useDefinitionContext = () => 
{
    const context = useContext(DefinitionContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
