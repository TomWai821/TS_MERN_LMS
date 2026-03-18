import express from 'express';
import { upload } from '../storage';
import { LoginAndFindUser } from '../data/middlewareGroup';
import { CreateBookRecord, DeleteBookRecord, EditBookRecord, GetBookImage, GetBookRecord, GetDataFromGoogleBook } from '../controller/bookController';

import { BookCreateRules } from '../validator/expressBodyValidator';
import { GetBookDataService, GetFavouriteBookDataService } from '../service/book/bookGetDataService';

import { CreateLoanBookRecord, GetLoanBookRecord, UpdateLoanBookRecord } from '../controller/loanBookController';
import { BookGenreIDAndLanguageIDValidation, BookNameValidation, BookRecordIDValidation, FoundBookLoanRecord } from '../middleware/Book/bookValidationMiddleware';
import { FetchUserFromHeader } from '../middleware/User/authMiddleware';
import { CreateFavouriteBookRecord, DeleteFavouriteBookRecord, GetFavouriteBookRecord } from '../controller/favouriteBookController';
import { HandleEditImage } from '../service/book/bookEditImageService';

const router = express.Router();

// For book records
router.get('/record', GetBookDataService, GetBookRecord);
router.post('/record', upload.single("image"), BookCreateRules, ...LoginAndFindUser, BookNameValidation, BookGenreIDAndLanguageIDValidation, CreateBookRecord);
router.put('/record/id=:id', upload.single("image"), ...LoginAndFindUser, BookRecordIDValidation, BookGenreIDAndLanguageIDValidation, HandleEditImage, EditBookRecord);
router.delete('/record/id=:id', ...LoginAndFindUser, BookRecordIDValidation, DeleteBookRecord);

// For Loan book records
router.get('/loanRecord/type=:type', FetchUserFromHeader, GetLoanBookRecord);
router.post('/loanRecord', ...LoginAndFindUser, CreateLoanBookRecord);
router.put('/loanRecord/id=:id', ...LoginAndFindUser, FoundBookLoanRecord, UpdateLoanBookRecord);

// For Loan book records
router.get('/favourite', ...LoginAndFindUser, FetchUserFromHeader, GetFavouriteBookDataService, GetFavouriteBookRecord);
router.post('/favourite', ...LoginAndFindUser, CreateFavouriteBookRecord);
router.delete('/favourite/id=:id', ...LoginAndFindUser, DeleteFavouriteBookRecord);

// For image
router.get("/uploads/:filename", GetBookImage);
router.get("/external", ...LoginAndFindUser, GetDataFromGoogleBook)

export default router;