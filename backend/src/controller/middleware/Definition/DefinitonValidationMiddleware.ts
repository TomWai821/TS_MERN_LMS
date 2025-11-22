import { Request, Response, NextFunction } from "express";
import { definitionHandlers } from "../../definitionController";

export const DefinitionTypeValidation = async (req: Request, res: Response, next:NextFunction) => 
{
    const definitionType = req.params.type as keyof typeof definitionHandlers;

    if (!definitionHandlers[definitionType]) 
    {
        return res.status(404).json({ success: false, error: `Invalid type: ${definitionType}` });
    }
    
    next();
};

export const DefinitionDataValidation = async (req: Request, res: Response, next:NextFunction) => 
{
    const definitionType = req.params.type as keyof typeof definitionHandlers;

    const isInvalidDataType = (invalidField: string) => 
    {
        if (req.body[invalidField]) 
        {
            return res.status(400).json({ success: false, error: `Invalid data type in JSON file: ${invalidField}` });
        }
    };
    
    if (definitionType === "Genre")
    {
        isInvalidDataType("language");
    }

    if (definitionType === "Language") 
    {
        isInvalidDataType("genre");
    }

    next();
};
    