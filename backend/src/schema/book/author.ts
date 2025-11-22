import mongoose, { ObjectId } from 'mongoose';
import { AuthorInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';

const authorSchema = new mongoose.Schema<AuthorInterface>
(
    {
        author: { type: String, required: true },
        phoneNumber: { type: String, default: "N/A" },
        email: { type:String, default: "N/A" }
    }
)

const Author = mongoose.model<AuthorInterface>('Author', authorSchema);

export const CreateAuthor = async (data:Record<string, any>) => 
{
    try
    {
        return await Author.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetAuthor = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await Author.find({});
        }
        return await Author.find(data);
    }
    catch(error)
    {
        printError(error);
    }

};
        
export const FindAuthor = async (data: Record<string, any>) => 
{
    try
    {
        return await Author.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindAuthorByID = async (publisherID: string, select?: Record<string, any>) => 
{
    try
    {
        if(select)
        {
            return await Author.findById(publisherID).select(select);
        }
        return await Author.findById(publisherID);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindAuthorByIDAndUpdate = async (publisherID: string, data: Record<string, any>) => 
{
    try
    {
        return await Author.findByIdAndUpdate(publisherID, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindAuthorByIDAndDelete = async (publisherID: ObjectId) =>
{
    try
    {
        return await Author.findByIdAndDelete(publisherID);
    }
    catch(error)
    {
        printError(error);
    }
}