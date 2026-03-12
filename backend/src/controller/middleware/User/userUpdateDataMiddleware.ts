import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../model/requestInterface";
import { FindUser } from "../../../schema/user/user";
import { CreateSuspendList, FindSuspendList } from "../../../schema/user/suspendList";
import { UserInterface } from "../../../model/userSchemaInterface";

// For user update(Require login)
export const BuildUpdateData = async (req: AuthRequest, res:Response, next:NextFunction) => 
{
    const { username, email, gender, role } = req.body;
    const foundUser = req.foundUser as UserInterface;

    const updateData: Record<string, any> = {};
    
    let checkPromise: Promise<any>[] = [];
    let labels: string[] = [];

    if(username && username !== foundUser.username)
    {
        checkPromise.push(FindUser({username}));
        labels.push("username");
    }

    if(email && email !== foundUser.email)
    {
        checkPromise.push(FindUser({email}));
        labels.push("email");
    }

    const result = await Promise.all(checkPromise);

    for(let i = 0; i < result.length; i++)
    {
        if(result[i])
        {
            const field = result[i];
            return res.status(400).json({ success: false, error: `${field == 0 ? 'Username' : 'Email'} already in use` });
        }
    }

    if (gender && gender !== foundUser.gender)  updateData.gender = gender;

    if (role && role !== foundUser.role)  updateData.role = role;

    if (Object.keys(updateData).length === 0) 
    {
        return res.status(400).json({ success: false, error: "No changes detected" });
    }
    
    req.updateData = updateData;
    next();
}

export const CreateStatusList = async (statusForUserList:string, userId:string, description: string, startDate: Date, dueDate: Date) => 
{
    const ListHandlers:Record<string, { find: () => Promise<any>; actions: () => Promise<any>; }> = 
    {
        "Suspend":
        {
            find: () => FindSuspendList({ userId }), actions: () => CreateSuspendList({ userID: userId, description, startDate, dueDate }) 
        }
    }

    const { find, actions } = ListHandlers[statusForUserList];

    if (!ListHandlers[statusForUserList]) 
    {
        console.log(`Invalid status: ${statusForUserList}`);
    }

    const existingList = await find();

    if (!existingList) 
    {
        try
        {
            return await actions();
        } 
        catch (error) 
        {
            console.error(`Unhandled error: ${error}`);
            throw new Error("Failed to create list");
        }
    }

    return false;
}