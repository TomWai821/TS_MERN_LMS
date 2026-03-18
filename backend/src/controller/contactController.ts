import { Request, Response } from "express"
import { ContactConfig, ContactType } from "../config/contactConfig";

export const GetContactRecord = async (req: Request, res: Response) => 
{
    const type = req.params.type as ContactType;
    const config = ContactConfig[type];

    if (!config)
    {
        return res.status(400).json({ success: false, error: "Invalid Type" });
    }

    try 
    {
        const nameKey = config.field;
        const searchValue = req.query[nameKey] as string;

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

        return res.json({ success: true, foundContact: getData });
    } 
    catch (error) 
    {
        console.error("Get Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const CreateContactRecord = async (req: Request, res: Response) => 
{
    const { author, publisher, email, phoneNumber } = req.body;
    const type = req.params.type as ContactType;
    const config = ContactConfig[type];

    if (!config)
    {
        return res.status(400).json({ success: false, error: "Invalid Type" });
    }

    try 
    {
        let finalData: any = { email: email, phoneNumber: phoneNumber };
        let checkName = "";

        if (type === "Author") 
        {
            finalData.author = author;
            checkName = author;
        } 
        else 
        {
            finalData.publisher = publisher;
            checkName = publisher;
        }

        const nameKey = config.field;
        const nameExists = await config.find({ [nameKey]: checkName });
        if (nameExists) 
        {
            return res.status(400).json({ success: false, error: `${type} already exists!` });
        }

        if (email) 
        {
            const emailExists = await config.find({ email: email });
            if (emailExists) 
            {
                return res.status(400).json({ success: false, error: "Email is already taken!" });
            }
        }

        const record = await config.create(finalData);
        if (!record) 
        {
            return res.status(400).json({ success: false, error: "Create failed" });
        }

        return res.json({ success: true, message: `Created ${type} successfully!` });
    } 
    catch (error) 
    {
        console.error("Create Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const UpdateContactRecord = async (req: Request, res: Response) => 
{
    const { id, author, publisher, email, phoneNumber } = req.body;
    const type = req.params.type as ContactType;
    const config = ContactConfig[type];

    if (!config)
    {
        return res.status(400).json({ success: false, error: "Invalid Type" });
    }

    try 
    {
        const nameKey = config.field;
        const newName = type === "Author" ? author : publisher;
        
        if (newName) 
        {
            const duplicate = await config.find({ [nameKey]: newName, _id: { $ne: id } });

            if (duplicate) 
            {
                return res.status(400).json({ success: false, error: `${type} with this name already exists!` });
            }
        }

        if (email) 
        {
            const duplicateEmail = await config.find({ email: email, _id: { $ne: id } });

            if (duplicateEmail) 
            {
                return res.status(400).json({ success: false, error: `${type} with this email arleady exists!` });
            }
        }

        let updateBody: any = { email: email, phoneNumber: phoneNumber };

        type === "Author" ? updateBody.author = author : updateBody.publisher = publisher;

        const record = await config.update(id, updateBody);

        if (!record)
        {
            return res.status(404).json({ success: false, error: "Record not found!" });
        }

        return res.json({ success: true, message: "Updated!", data: record });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



export const DeleteContactRecord = async (req: Request, res: Response) => 
{
    const { id } = req.body;
    const definitionType = req.params.type as ContactType;
    const config = ContactConfig[definitionType];

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
