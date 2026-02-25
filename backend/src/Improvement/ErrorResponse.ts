const errorCategories = 
{ 
    authentication: 
    { 
        '1000': "Invalid authentication!", 
        '1001': "Invalid registration input!" 
    }, 
    input:
    { 
        '2000': "Invalid input (User data)!", 
        '2002': "Invalid input (Book data)!",
        '2003': "Invalid input (Loan Book data)!",
        '2004': "Invalid input (Author data)!",
        '2005': "Invalid input (Publisher data)!",
        '2006': "Invalid input (Genre data)!",
        '2007': "Invalid input (Language data)!",
    }, 
    system: 
    { 
        '3000': "Access denied!", 
        '4000': "Internal server error!" 
    } 
}; 

type errorCode = 
    keyof typeof errorCategories['authentication'] | 
    keyof typeof errorCategories['input'] | 
    keyof typeof errorCategories['system']; 

const errorList: Record<errorCode, string> = 
{ 
    ...errorCategories.authentication, 
    ...errorCategories.input,
    ...errorCategories.system 
};

export const errorResponse = (errorCode: errorCode, message: string) => 
{ 
    return { success: false, errorCode, errorMessage: errorList[errorCode], message };
};