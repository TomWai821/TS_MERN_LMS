import { config } from "../../config/config";
import { IStorageStrategy } from "../../storage/StorageFactory";
import { LocalStrategy, S3Strategy } from "../../storage/StorageStrategy";

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