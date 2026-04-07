import express from 'express';
import { LoginAndFindUser } from '../../data/middlewareGroup';
import { DefinitionDataValidation, DefinitionTypeValidation } from '../../middleware/Book/DefinitonValidationMiddleware';
import { GetDefinitionRecord, CreateDefinitionRecord, UpdateDefinitionRecord, DeleteDefinitionRecord } from '../../controller/definitionController';

const router = express.Router();

// For definition
router.get('/type=:type', DefinitionTypeValidation, GetDefinitionRecord);
router.post('/type=:type', ...LoginAndFindUser, DefinitionTypeValidation, DefinitionDataValidation, CreateDefinitionRecord);
router.put('/type=:type', ...LoginAndFindUser, DefinitionTypeValidation, DefinitionDataValidation, UpdateDefinitionRecord);
router.delete('/type=:type', ...LoginAndFindUser, DefinitionTypeValidation, DeleteDefinitionRecord);

export default router;