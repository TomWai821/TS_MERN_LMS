import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { ChildProps, SelfBookRecordContextProps } from "../../Model/ContextAndProviderModel";
import { BookDataInterface, GetResultInterface, LoanBookInterface } from "../../Model/ResultModel";
import { fetchFavouriteBook, fetchLoanBook, fetchSuggestBook } from "../../Controller/BookController/BookGetController";
import { createFavouriteBookRecord } from "../../Controller/BookController/BookPostController";
import { useAuthContext } from "../User/AuthContext";
import { deleteBookRecord } from "../../Controller/BookController/BookDeleteController";

const SelfBookRecordContext = createContext<SelfBookRecordContextProps | undefined>(undefined);

export const SelfBookRecordProvider:FC<ChildProps> = ({children}) => 
{
    const {GetData} = useAuthContext();

    const [SelfLoanBook, setSelfLoanBook] = useState<LoanBookInterface[]>([]);
    const [FavouriteBook, setFavouriteBook] = useState<LoanBookInterface[]>([]);
    const [bookForUser, setBookForUser] = useState<BookDataInterface[]>([]);
    const BookRecordForUser = [SelfLoanBook, FavouriteBook];

    const authToken = GetData("authToken") as string;

    const fetchSelfRecord = useCallback(async () => 
    {
        fetchFavouriteRecord();
        fetchSelfLoanRecord();
        fetchRecommendBookForUser();
    },[])

    const fetchFavouriteRecord = useCallback(async() => 
    {
        const resultForFavouriteBook: GetResultInterface | undefined = await fetchFavouriteBook(authToken);
    
        if (resultForFavouriteBook && Array.isArray(resultForFavouriteBook.foundFavouriteBook)) 
        {
            setFavouriteBook(resultForFavouriteBook.foundFavouriteBook);
        }
    },[])

    const fetchSelfLoanRecord = useCallback(async() =>
    {
        const resultForSelfLoanBook: GetResultInterface | undefined = await fetchLoanBook(authToken, "Self");
    
        if (resultForSelfLoanBook && Array.isArray(resultForSelfLoanBook.foundLoanBook)) 
        {
            setSelfLoanBook(resultForSelfLoanBook.foundLoanBook);
            GetSuggestData(resultForSelfLoanBook.foundLoanBook);
            return true;
        }
        return false;
    },[])

    const GetSuggestData = useCallback(async (suggestBookData: LoanBookInterface[]) => 
    {
        if (!suggestBookData || !Array.isArray(suggestBookData) || suggestBookData.length === 0) 
        {
            return []; 
        }
        
        return suggestBookData.slice(0, 10).map((book) =>
        (
            {
                bookname: book.bookDetails?.bookname || 'Unknown Book Name',
                genre: book.genreDetails?.genre || 'Unknown Genre',
                author: book.authorDetails?.author || 'Unknown Author',
                publisher: book.publisherDetails?.publisher || 'Unknown Publisher'
            }
        ));
    }, []);

    const fetchRecommendBookForUser = useCallback(async () => 
    {
        const suggestionData = await GetSuggestData(SelfLoanBook);

        if (suggestionData.length > 0) 
        {
            const resultForUser = await fetchSuggestBook("forUser", authToken, suggestionData);

            if (resultForUser && Array.isArray(resultForUser.foundBook)) 
            {
                setBookForUser(resultForUser.foundBook);
            }
        }
    }, [SelfLoanBook]);

    const fetchSelfFavouriteBookWithFilterData = useCallback(async(bookname?:string, status?:string, genreID?:string, languageID?:string, authorID?:string, publisherID?:string) => 
    {
        const result = await fetchFavouriteBook(authToken, bookname, status, genreID, languageID, authorID, publisherID);

        if(result && Array.isArray(result.foundFavouriteBook))
        {
            setFavouriteBook(result.foundFavouriteBook);
        }
    },[])

    const fetchSelfLoanBookWithFilterData = useCallback(async(type:string, bookname?:string, status?:string) => 
    {
        const result = await fetchLoanBook(authToken, type, bookname, undefined, status);
        
        if(result && Array.isArray(result.foundLoanBook))
        {
            setSelfLoanBook(result.foundLoanBook);
        }
    },[])

    const favouriteBook = useCallback(async(bookID:string) => 
    {
        const result = await createFavouriteBookRecord(authToken, bookID);

        if(result)
        {
            fetchSelfRecord();
            return true;
        }
        return false;
    },[])

    const unfavouriteBook = useCallback(async(FavouriteBookID:string) => 
    {
        const result = await deleteBookRecord("Favourite", authToken, FavouriteBookID);

        if(result)
        {
            fetchSelfRecord();
            return true;
        }
        return false;
    },[])

    useEffect(() => 
    {
        if (SelfLoanBook.length > 0) 
        {
            fetchRecommendBookForUser();
        }
    }, [SelfLoanBook]);

    return (
        <SelfBookRecordContext.Provider value={{ BookRecordForUser, bookForUser, fetchFavouriteRecord, fetchSelfLoanRecord, GetSuggestData, fetchSelfFavouriteBookWithFilterData, fetchSelfLoanBookWithFilterData, favouriteBook, unfavouriteBook }}>
            {children}
        </SelfBookRecordContext.Provider>
    );
}

export const useSelfBookRecordContext = () => 
{
    const context = useContext(SelfBookRecordContext);
    
    if (context === undefined) 
    {
        throw new Error("useSelfBookRecordContext must be used within a SelfBookRecordProvider");
    }
    return context;
};