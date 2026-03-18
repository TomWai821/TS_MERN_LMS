import { CreateAuthor, FindAuthor, FindAuthorByIDAndDelete, FindAuthorByIDAndUpdate, GetAuthor } from "../schema/contact/author";
import { CreatePublisher, FindPublisher, FindPublisherByIDAndDelete, FindPublisherByIDAndUpdate, GetPublisher } from "../schema/contact/publisher";

export type ContactType = "Author" | "Publisher";

interface ContactEntry 
{
    find: Function;
    create: Function;
    update: Function;
    delete: Function;
    get: Function;
    field: string;
}


export const ContactConfig: Record<ContactType,ContactEntry> = 
{
    Author: 
    {
        find: FindAuthor,
        create: CreateAuthor,
        update: FindAuthorByIDAndUpdate,
        delete: FindAuthorByIDAndDelete,
        get: GetAuthor,
        field: "author"
    },
    Publisher: 
    {
        find: FindPublisher,
        create: CreatePublisher,
        update: FindPublisherByIDAndUpdate,
        delete: FindPublisherByIDAndDelete,
        get: GetPublisher,
        field: "publisher"
    }
};