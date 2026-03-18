import { CreateGenre, FindGenre, FindGenreByIDAndDelete, FindGenreByIDAndUpdate, GetGenre } from "../schema/definition/genre";
import { CreateLanguage, FindLanguage, FindLanguageByIDAndDelete, FindLanguageByIDAndUpdate, GetLanguage } from "../schema/definition/language";

export type DefinitionType = "Language" | "Genre";

interface DefinitionEntry 
{
    find: Function;
    create: Function;
    update: Function;
    delete: Function;
    get: Function;
    field: string;
}


export const DefinitionConfig: Record<DefinitionType,DefinitionEntry> = 
{
    Language: 
    {
        find: FindLanguage,
        create: CreateLanguage,
        update: FindLanguageByIDAndUpdate,
        delete: FindLanguageByIDAndDelete,
        get: GetLanguage,
        field: "language"
    },
    Genre: 
    {
        find: FindGenre,
        create: CreateGenre,
        update: FindGenreByIDAndUpdate,
        delete: FindGenreByIDAndDelete,
        get: GetGenre,
        field: "genre"
    }
};