import { GetResultInterface } from "../../Model/ResultModel";

const localhost = process.env.REACT_APP_LOCAL_HOST;
const url = `${localhost}/book/definition/`;
const contentType = "application/json";

export const GetDefinition = async (type:string, data?:string) => 
{
    try
    {
        const actualUrl = data ? url+`type=${type}?name=${data}` : url+`type=${type}`;

        const response = await fetch(actualUrl,
            {
                method: 'GET',
                headers: { 'content-type': contentType }
            }
        );

        if(response.ok)
        {
            const result:GetResultInterface = await response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export const CreateDefinitionData = async (type:string, authToken:string, shortName:string, detailsName:string) => 
{
    try
    {
        const data = BuildBodyData(type, shortName, detailsName, undefined);

        const response = await fetch(url+`type=${type}`,
            {
                method: 'POST',
                headers: { 'content-type': contentType, 'authToken': authToken },
                body: JSON.stringify(data)
            }
        );

        if(response.ok)
        {
            const result = response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export const EditDefinitionData = async (type:string, authToken:string, id:string, shortName:string, detailsName:string) => 
{        
    const data = BuildBodyData(type, shortName, detailsName, id);

    try
    {
        const response = await fetch(url+`type=${type}`,
            {
                method: 'PUT',
                headers: { 'content-type': contentType, 'authToken': authToken  },
                body: JSON.stringify(data)
            }
        );

        if(response.ok)
        {
            const result = response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export const DeleteDefinitionData = async (type:string, authToken:string, id:string) => 
{
    try
    {
        const response = await fetch(url+`type=${type}`,
            {
                method: 'DELETE',
                headers: { 'content-type': contentType, 'authToken': authToken  },
                body: JSON.stringify({id})
            }
        );

        if(response.ok)
        {
            const result = response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

const BuildBodyData = (type:string, shortName:string, detailsName:string, id?:string) => 
{
    let data:Record<string, any> = {shortName};

    if(id)
    {
        data.id = id;
    }

    switch(type)
    {
        case "Genre":
            data.genre = detailsName;
            break;
        
        case "Language":
            data.language = detailsName;
            break;

        default:
            return console.log(`Invalid type ${type}`);
    }
    return data;
}
