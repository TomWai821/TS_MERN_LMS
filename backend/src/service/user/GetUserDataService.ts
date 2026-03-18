import { NextFunction, Response } from "express";
import { AuthRequest } from "../../model/requestInterface";
import { FindUserByID, FindUserWithData, GetUser } from "../../schema/user/user";

export const GetUserDataService = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const userId = req.user?._id;
    const tableName = req.params.tableName;
    const queryParams = req.query;
    
    let foundUserData: any = null;

    try 
    {
        if (userId) 
        {
            const hasBodyParameter = Object.keys(queryParams).length > 0;
            foundUserData = (!hasBodyParameter && !tableName)? await FindUserByID(userId as unknown as string) : await fetchUserData(tableName as string, queryParams, userId as unknown as string);
        } 
        else 
        {
            foundUserData = await GetUser();
        }

        if (!foundUserData) 
        {
            return res.status(404).json({ success: false, message: "User information not found" });
        }

        req.foundUser = foundUserData;
        next();

    } 
    catch (error) 
    {
        console.error("BuildUserQuery Middleware Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const fetchUserData = async (tableName: string, queryParams: any, userId?: string) => 
{
    const query = buildQuery(queryParams);
    return await FindUserWithData(tableName, query, userId);
};

const buildQuery = (queryParams: any) => 
{
    const { username, status, role, gender } = queryParams;

    return {
        ...(username && { "username": { $regex: username, $options: "i" } }),
        ...(status && { status }),
        ...(role && { role }),
        ...(gender && { gender })
    };
};