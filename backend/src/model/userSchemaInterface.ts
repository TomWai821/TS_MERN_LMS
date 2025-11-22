import mongoose from "mongoose";
import { CreateUserInterface } from "./requestInterface";

interface IDInterface
{
    _id: mongoose.Schema.Types.ObjectId;
}

interface UserInterface extends IDInterface, CreateUserInterface
{
    email: string;
    password: string;
}

interface RoleInterface extends IDInterface
{
    role:string;
}

interface GenderInterface extends IDInterface
{
    gender:string;
}

interface StatusInterface extends IDInterface
{
    status:string;
    description:string;
}

interface SuspendListInterface extends IDInterface
{
    userID: mongoose.Schema.Types.ObjectId;
    startDate: Date;
    dueDate: Date;
    unSuspendDate: Date | null;
    description: string;
    status:string;
}

export {IDInterface, UserInterface, RoleInterface, GenderInterface, StatusInterface, SuspendListInterface}