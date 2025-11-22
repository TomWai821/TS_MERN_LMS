export const setDataTextColor = (status:string, compareValue:string, comparedColor:string, notComparedColor:string) =>
{
    return status === compareValue ? comparedColor : notComparedColor;
}

export const setLoanBookDataTextColor = (status:string) =>
{
    const StatusMap:Record<string, string> = 
    {
        "Returned":"green",
        "Returned(Late)":"red",
        "Loaned":"orange",
        "Not Fine Needed":"green",
        "Not Paid":"red",
        "Paid":"green",
    }
    return StatusMap[status];
}