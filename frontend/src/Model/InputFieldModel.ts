import { ChangeEvent } from "react";
import { UserDataInterface } from "./UserTableModel";
import { BookTableDataInterface } from "./BookTableModel";

export interface ViewProfileModel
{
    username: string; 
    role: string; 
    email: string;
    gender: string;
};

export interface LoginModel
{
    email:string,
    password:string
}

export interface RegisterModel extends LoginModel
{
    username: string; 
    birthDay: string;
}

interface OptionInterface
{
    optionVisiable: boolean;
    onChange:(event: ChangeEvent<HTMLInputElement>, index?:number) => void;
}

export interface OptionFieldModel extends OptionInterface
{
    searchData: UserDataInterface;
    SearchField: { label: string; name: string; type: string; select?: boolean; slotProps?: object, options?: string[]} [];
}

export interface BookOptionFieldModal extends OptionInterface
{
    searchData: BookTableDataInterface;
    SearchField?: { label: string; name: string; type: string; select?: boolean; slotProps?: object, options?: string[]} [];
}
