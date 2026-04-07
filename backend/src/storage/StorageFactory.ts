import { LocalStrategy, S3Strategy } from "./StorageStrategy";
import { config } from "../config/config";

export interface IStorageStrategy 
{
    getReadUrl(imageName: string): string | Promise<string> | null;
    handleResponse(imageName: string, res: any): void;
}

export const getStorageStrategy = (): IStorageStrategy => 
{
    switch (config.STORAGE_TYPE) 
    {
        case 'S3': 
            return new S3Strategy();
        
        case 'LOCAL': 
            return new LocalStrategy();
        
        default: 
            throw new Error("Invalid storage type");
    }
};
