import { NextFunction, Response } from "express";
import { AuthRequest } from "../../model/requestInterface";
import { GetBook } from "../../schema/book/book";
import { ObjectId } from "mongodb";
import { GetBookFavourite } from "../../schema/book/bookFavourite";

export const GetBookDataService = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const queryParams = req.query;

    try 
    {
        const hasParams = Object.keys(queryParams).length > 0;

        const foundBook = hasParams ? await fetchBookData(queryParams) : await GetBook();

        if (!foundBook) 
        {
            return res.status(404).json({ success: false, message: "Could not find any books." });
        }

        req.foundBook = foundBook;
        next();
    } 
    catch (error) 
    {
        console.error("GetBookDataService Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export const GetFavouriteBookDataService = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const userID = req.user?._id;
    const queryParams = req.query;
    let query:any;
    
    try 
    {
        const hasBodyParameter = Object.keys(queryParams).length > 0;

        if(hasBodyParameter)
        {
            query = buildQuery("Favourite", queryParams);
        }

        let userObjectId = new ObjectId(userID as unknown as ObjectId);

        const completeQuery = hasBodyParameter ? {...query, userID: userObjectId} : {userID: userObjectId};
        
        let foundFavouriteBook = await GetBookFavourite(completeQuery);

        if(!foundFavouriteBook)
        {
            return res.status(404).json({sucess: false, error: 'Could not found favourite book record!'})
        }

        req.foundFavouriteBook = foundFavouriteBook;
        next();
    } 
    catch (error) 
    {
        console.error("GetFavouriteBookDataService Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}


const fetchBookData = async (queryParams: any) => 
{
    const query = buildQuery("All", queryParams);
    return await GetBook(query);
};

const buildQuery = (type:string, queryParams: any) => 
{
    const { bookname, status, genreID, languageID, publisherID, authorID } = queryParams;
    let query = {};

    switch(type)
    {
        case "All":
            query = 
                {
                    ...(bookname && { "bookname": { $regex: bookname, $options: "i" } }),
                    ...(status && { "status": status }),
                    ...(genreID && { "genreID": new ObjectId(genreID) }),
                    ...(languageID && { "languageID": new ObjectId(languageID) }),
                    ...(publisherID && { "publisherID": new ObjectId(publisherID) }),
                    ...(authorID && { "authorID": new ObjectId(authorID) }),
                };
            break;

        case "Favourite":
            query = 
                {
                    ...(bookname && { "bookDetails.bookname": { $regex: bookname, $options: "i" } }),
                    ...(status && { "bookDetails.status": status }),
                    ...(genreID && { "bookDetails.genreID": new ObjectId(genreID) }),
                    ...(languageID && { "bookDetails.languageID": new ObjectId(languageID) }),
                    ...(publisherID && { "bookDetails.publisherID": new ObjectId(publisherID) }),
                    ...(authorID && { "bookDetails.authorID": new ObjectId(authorID) }),
                };
            break;
    }
    
    return query;
};