import express from 'express';
import { GetSuggestBookDataService } from '../../service/book/bookRecommendationService';
import { GetBookRecord } from '../../controller/bookController';
import { FetchUserFromHeader } from '../../middleware/User/authMiddleware';

const router = express.Router();

// For Suggest Book
router.get('/type=:type', FetchUserFromHeader, GetSuggestBookDataService, GetBookRecord);
router.post('/type=:type', FetchUserFromHeader, GetSuggestBookDataService, GetBookRecord);
router.get('/type=:type', FetchUserFromHeader, GetSuggestBookDataService, GetBookRecord);

export default router;