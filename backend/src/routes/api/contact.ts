import express from 'express';
import { LoginAndFindUser } from '../../data/middlewareGroup';
import { ContactDataValidation, ContactQueryValidation, ContactTypeValidation } from '../../middleware/Book/ContactValidationMiddleware';
import { CreateContactRecord, DeleteContactRecord, GetContactRecord, UpdateContactRecord } from '../../controller/contactController';

const router = express.Router();

// For publisher and author
router.get('/type=:type', ContactTypeValidation, ContactQueryValidation, GetContactRecord);
router.post('/type=:type', ...LoginAndFindUser, ContactTypeValidation, ContactDataValidation, CreateContactRecord);
router.put('/type=:type', ...LoginAndFindUser, ContactTypeValidation, ContactDataValidation, UpdateContactRecord);
router.delete('/type=:type', ...LoginAndFindUser, ContactTypeValidation, ContactDataValidation, DeleteContactRecord);

export default router;