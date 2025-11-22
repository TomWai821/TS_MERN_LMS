import { Routes, Route } from "react-router-dom"

// Another Pages
import LoginPage from "../Pages/LoginPage"
import MainPage from "../Pages/MainPage"
import RegisterPage from "../Pages/RegisterPage"
import BookPage from "../Pages/TablePages/BookPage"
import UserPage from "../Pages/TablePages/UserPage"
import ViewProfilePage from "../Pages/ViewProfilePage"
import DefinitionPage from "../Pages/TablePages/DefinitionPage"
import SelfLoanRecordPage from "../Pages/TablePages/SelfRecordPage"
import ContactPage from "../Pages/TablePages/ContactPage"

const RouteMap : Record<string, JSX.Element> = 
{
    "/": <MainPage/>,
    "/login": <LoginPage/>,
    "/register": <RegisterPage/>,
    "/profile": <ViewProfilePage/>,
    "/viewBook": <BookPage/>,
    "/viewUser": <UserPage/>,
    "/records": <SelfLoanRecordPage/>,
    "/defination": <DefinitionPage/>,
    "/contact": <ContactPage/>,
}

const RoutesList = () => 
{
    return(
        <Routes>
            {
                Object.entries(RouteMap).map(([path, element], index) => 
                (
                    <Route path={path} element={element} key={index}/>
                ))
            }
        </Routes>
    )
    
}

export default RoutesList