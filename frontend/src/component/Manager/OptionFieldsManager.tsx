import { FC } from "react";
import SearchOptionField from "../UIFragment/SearchOptionField";
import { OptionFieldsInterface } from "../../Model/TablePagesAndModalModel";

import SearchOptionFieldForBook from "../UIFragment/SearchOptionFieldForBook";
import { AllUserSearchField, OtherUserSearchField, SearchLoanBookInputField } from "../../Data/TextFieldsData";


const OptionFieldsManager:FC<OptionFieldsInterface> = (searchOptionFieldData) => 
{
    const {value, type, optionVisiable, onChange, searchData} = searchOptionFieldData;

    const OptionType=
    {
        Book:
        [
            <SearchOptionFieldForBook optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>,
            <SearchOptionFieldForBook optionVisiable={optionVisiable} onChange={onChange} SearchField={SearchLoanBookInputField} searchData={searchData}/>,
        ],
        User:
        [
            <SearchOptionField optionVisiable={optionVisiable} onChange={onChange} SearchField={AllUserSearchField} searchData={searchData} />,
            <SearchOptionField optionVisiable={optionVisiable} onChange={onChange} SearchField={OtherUserSearchField} searchData={searchData} />
        ],
        Record:
        [
            <></>,
            <SearchOptionFieldForBook optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>
        ]
    }

    return OptionType[type as keyof typeof OptionType][value];
}

export default OptionFieldsManager;
