import { Request, Response } from "express"
import { DefinitionConfig, DefinitionType } from "../config/definitionConfig";

export const GetDefinitionRecord = async (req: Request, res: Response) => 
{
    const definitionType = req.params.type as DefinitionType;
    const config = DefinitionConfig[definitionType];

    if (!config)
    {
        return res.status(400).json({ success: false, error: "Invalid Type" });
    }

    try 
    {
        const nameKey = config.field;
        const searchValue = req.query.name as string;

        let query = {};
        if (searchValue)
        {
            query = { [nameKey]: { $regex: searchValue, $options: "i" } };
        }
        
        const getData = await config.get(query);

        if (!getData) 
        {
            return res.status(400).json({ success: false, error: "Failed to fetch data" });
        }

        return res.json({ success: true, foundDefinition: getData });
    } 
    catch (error) 
    {
        console.error(`Get Error: ${error}`);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const CreateDefinitionRecord = async (req: Request, res: Response) => 
{
    const definitionType = req.params.type as DefinitionType;
    const config = DefinitionConfig[definitionType];

    if (!config)
    {
        return res.status(400).json({ success: false, error: "Invalid Type" });
    }

    const nameKey = config.field;
    const { [nameKey]: name, shortName } = req.body;

    try 
    {
        if (await config.find({ [nameKey]: name })) 
        {
            return res.status(400).json({ success: false, error: `${definitionType} "${name}" already exists!` });
        }

        if (shortName && await config.find({ shortName })) 
        {
            return res.status(400).json({ success: false, error: `Short Name "${shortName}" is already taken!` });
        }

        const record = await config.create({ [nameKey]: name, shortName });
        
        if (!record) 
        {
            return res.status(400).json({ success: false, error: `Failed to create ${definitionType}` });
        }

        return res.json({ success: true, message: `Created ${definitionType} successfully!` });
    } 
    catch(error) 
    {
        console.error(`Create Error: ${error}`);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const UpdateDefinitionRecord = async (req: Request, res: Response) =>
{
    const definitionType = req.params.type as DefinitionType;
    const config = DefinitionConfig[definitionType];

    if (!config)
    {
        return res.status(400).json({ success: false, error: "Invalid Type" });
    }

    const nameKey = config.field;

    const { id, [nameKey]: name, shortName } = req.body;

    try 
    {
        if (name && await config.find({ [nameKey]: name, _id: { $ne: id } })) 
        {
            return res.status(400).json({ success: false, error: `${definitionType} name already exists!` });
        }

        if (shortName && await config.find({ shortName, _id: { $ne: id } })) 
        {
            return res.status(400).json({ success: false, error: `Short Name is already taken!` });
        }

        const record = await config.update(id, { [nameKey]: name, shortName });
        
        if (!record) 
        {
            return res.status(404).json({ success: false, error: `Record not found` });
        }

        return res.json({ success: true, message: `Update ${definitionType} successfully!`, data: record });
    } 
    catch(error) 
    {
        console.error(`Update Error: ${error}`);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

export const DeleteDefinitionRecord = async (req: Request, res: Response) => {
    const { id } = req.body;
    const definitionType = req.params.type as DefinitionType;
    const config = DefinitionConfig[definitionType];

    if (!config)
    {
        return res.status(400).json({ success: false, error: "Invalid Type" });
    }

    try 
    {
        const deleteData = await config.delete(id);
        
        if (!deleteData) 
        {
            return res.status(400).json({ success: false, error: `Failed to delete ${definitionType} data` });
        }

        return res.json({ success: true, message: `Delete ${definitionType} Data successfully!` });
    } 
    catch (error) 
    {
        console.error(`Delete Error: ${error}`);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
