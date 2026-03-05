import { NextFunction, Response } from "express";
import { AuthRequest, Book } from "../../../model/requestInterface";
import { BookInterface } from "../../../model/bookSchemaInterface";
import { GetBook } from "../../../schema/book/book";
import { ObjectId } from "mongodb";
import { GetBookFavourite } from "../../../schema/book/bookFavourite";
import { calculateTFIDF } from "../../TF-IDF_Logic";

// for build query (GET method in user, which require login)
export const BuildBookQueryAndGetData = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const queryParams = req.query;
    let foundBook: BookInterface | BookInterface[] | null | undefined;

    const hasBodyParameter = Object.keys(queryParams).length > 0;

    foundBook = (hasBodyParameter) ? await fetchBookData(queryParams) : foundBook = await GetBook();

    if (!foundBook) 
    {
        return res.status(404).json({success: false, message:"Could not found book"});
    }

    req.foundBook = foundBook;
    next();
};

export const BuildFavouriteBookQueryAndGetData = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const userID = req.user?._id;
    const queryParams = req.query;
    let query:any;

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

export const BuildSuggestBookQueryAndGetData = async(req: AuthRequest, res: Response, next: NextFunction) => 
{
    const suggestType = req.params.type;
    const userId = req.user?._id;
    let foundBook: BookInterface | BookInterface[] | null | undefined;
 
    switch(suggestType)
    {
        case "newPublish":
            foundBook = await GetBook(undefined, { publishDate: -1 } , 8);
            break;

        case "forUser":
            const {suggestionData} = req.body;
            
            if (!userId) 
            {
                return res.status(400).json({ success: false, message: `This suggestion type requires authToken!` });
            }
        
            const loanedBooksCorpus = (suggestionData as Book[]).map( book => `${book.bookname} ${book.genre} ${book.author} ${book.publisher}`);

            const preferedGenre = Array.from(new Set((suggestionData as Book[]).map(book => book.genre)));
        
            const allBooks = await GetBook(undefined);
        
            const allBooksCorpus = (allBooks as any[]).map(book => ({ id: book._id, metadata: `${book.bookname} ${book.genreDetails.genre} ${book.authorDetails.author} ${book.publisherDetails.publisher}` }));
        
            const TF_IDF_Scores = calculateTFIDF(loanedBooksCorpus, allBooksCorpus, preferedGenre);

            const scoreMap = new Map(TF_IDF_Scores.map(s => [s.id.toString(), s.score]));
            
            const topBookIds = TF_IDF_Scores.slice(0, 20).map((book: { id: any; }) => book.id);

            foundBook = await GetBook({ _id: { $in: topBookIds } }, undefined);

            const suggestedBookNames = (suggestionData as Book[]).map(book => book.bookname);

            // Exclude top 5 loan book records (Top 5 due to the limited book amount in database)
            const excludedNames = suggestedBookNames.slice(0, 5);

            foundBook = (foundBook as BookInterface[])
            .filter(book => !excludedNames.includes(book.bookname))
            .sort((a, b) => 
            {
                const scoreA = scoreMap.get(a._id.toString()) || 0;
                const scoreB = scoreMap.get(b._id.toString()) || 0;
                return scoreB - scoreA;
            })
            .slice(0, 8);
            break;

        default:
            return res.status(400).json({success: false, message: `Invalid Suggest Type: ${suggestType}`});
    }

    if (!foundBook) 
    {
        return res.status(404).json({success: false, message: "Could not found suggested book"});
    }

    req.foundBook = foundBook;
    next();
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