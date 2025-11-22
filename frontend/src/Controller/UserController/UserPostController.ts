import { ResultInterface } from "../../Model/ResultModel"
import { handleSuccess } from "../OtherUsefulController";

const localhost = process.env.REACT_APP_LOCAL_HOST;

const contentType:string = 'application/json';
const url:string = `${localhost}/user`;

const LoginController = async (email:String, password:String, stayLogin:boolean): Promise<any> => 
{
    const user = {email, password};

    try
    {
        const response = await fetch(`${url}/Login`, 
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        );

        if(response.ok)
        {
            const result: ResultInterface = await response.json();
            handleSuccess(result, stayLogin);
        }
        return response.ok;
    }
    catch(error)
    {
        console.log(error);
    }
}

const RegisterController = async (registerPosition:string, username:string, email:string, password:string, role:string, gender:string, birthDay:string): Promise<any> => 
{
    const initals = (username.split(' ').map((word) => word[0].toUpperCase())).slice(0, 2);
    const avatarUrl = `https://via.placeholder.com/150?text=${initals}`

    const user = {username, email, password, gender, role, avatarUrl, birthDay};

    try
    {
        const response = await fetch(`${url}/Register`,
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        )

        if(registerPosition === "RegisterPanel" && response.ok)
        {
            const result: ResultInterface = await response.json();
            handleSuccess(result, false);
        }
        return response.ok;
    }
    catch(error)
    {
        console.log(error);
    }
}

export {LoginController, RegisterController}