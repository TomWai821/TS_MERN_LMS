import { UserResultDataInterface } from "./ResultModel";

interface UserDataInterface
{
    username:string;
    email:string;
    role:string;
    status:string;
    gender:string;
}

interface FindUserDateInterface extends UserDataInterface
{
    startDate:Date;
    dueDate:Date;
}

interface FindUserInterface extends FindUserDateInterface
{
    tableName?:string;
}

interface CreateUserInterface extends UserDataInterface
{
    password:string;
    birthDay:Date;
}

interface UserDataTableInterface
{
    value: number;
    userData: UserResultDataInterface[][];
    paginationValue: number;
    changeValue?: (type: string, newValue: number) => void;
    setSearchUserData?: (data: { username: string, role: string, status: string, gender: string }) => void;
    searchUserData?: { username: string, role: string, status: string, gender: string };
}

interface ChipBodyInterface
{
    value:number;
    title:string; 
    data:any[]; 
}

export type {UserDataInterface, FindUserInterface, CreateUserInterface, UserDataTableInterface, ChipBodyInterface}