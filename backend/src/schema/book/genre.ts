import mongoose, { ObjectId } from 'mongoose';
import { GenreInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';

const GenreSchema = new mongoose.Schema<GenreInterface>
(
    {
        genre: { type: String, required: true },
        shortName: { type:String, require: true }
    }
)

const Genre = mongoose.model<GenreInterface>('Genre', GenreSchema);

export const CreateGenre = async (data:Record<string, any>) =>
{
    try
    {
        return await Genre.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetGenre = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await Genre.find({});
        }
        return await Genre.find(data);
    }
    catch(error)
    {
        printError(error);
    }

};
        
export const FindGenre = async (data: Record<string, any>) =>
{
    try
    {
        return await Genre.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindGenreByID = async (genreId: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await Genre.findById(genreId).select(select);
        }
        return await Genre.findById(genreId);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindGenreByIDAndUpdate  = async (genreId: string, data: Record<string, any>) =>
{
    try
    {
        return await Genre.findByIdAndUpdate(genreId as unknown as ObjectId, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindGenreByIDAndDelete = async (genreId: string) =>
{
    try
    {
        return await Genre.findByIdAndDelete(genreId as unknown as ObjectId);
    }
    catch(error)
    {
        printError(error);
    }
}