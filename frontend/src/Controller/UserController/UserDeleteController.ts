const localhost = process.env.REACT_APP_LOCAL_HOST;

const url:string = `${localhost}/user`;
const contentType:string = 'application/json';

const DeleteUserController = async(authToken:string, userId:string) => 
{
    try
    {
        const response = await fetch(`${url}/User/id=${userId}`,
            {
                method: 'DELETE',
                headers: 
                { 
                    'content-type': contentType,
                    'authToken': authToken
                }
            }
        )

        if(response.ok)
        {
            const result = await response.json();
            return result;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export { DeleteUserController } 