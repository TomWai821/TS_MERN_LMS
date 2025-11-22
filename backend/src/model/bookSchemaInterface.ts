import mongoose from "mongoose";
import { IDInterface } from "./userSchemaInterface";

interface BookInterface extends IDInterface
{
    image: ImageInterface;
    bookname: string;
    languageID: mongoose.Schema.Types.ObjectId;
    genreID: mongoose.Schema.Types.ObjectId;
    authorID: mongoose.Schema.Types.ObjectId;
    publisherID: mongoose.Schema.Types.ObjectId;
    status:string;
    pages:number;
    description:string;
    publishDate:Date;
}

interface ImageInterface
{
    url:string;
    filename:string;
}

interface GenreInterface extends IDInterface
{
    genre:string,
    shortName:string;
}

interface LanguageInterface extends IDInterface
{
    shortName:string;
    language:string;
}

interface PublisherInterface extends IDInterface, ContractDataInterface
{
    publisher:string;
}

interface AuthorInterface extends IDInterface, ContractDataInterface
{
    author:string;
}

interface ContractDataInterface
{
    phoneNumber:string;
    email:string;
}

interface BookFavouriteInterface extends IDInterface
{
    bookID: mongoose.Schema.Types.ObjectId;
    userID: mongoose.Schema.Types.ObjectId;
    bookDetails?: BookInterface;
}

interface BookLoanedInterface extends IDInterface, BookFavouriteInterface
{
    dueDate: Date;
    loanDate: Date;
    returnDate?: Date | null;
    status: string;
    fineAmount: number;
    finesPaid: string;
}

export { BookInterface, ImageInterface, GenreInterface, LanguageInterface, PublisherInterface, AuthorInterface, BookFavouriteInterface, BookLoanedInterface}