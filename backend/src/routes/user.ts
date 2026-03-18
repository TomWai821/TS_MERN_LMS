import express from 'express';
import { UserRegisterRules, UserLoginRules, UserModifyDataRules, UserModifySelfDataRules } from '../validator/expressBodyValidator'
import { DeleteUser, GetUserData, ChangeUserData, UserLogin, UserRegister, ChangeStatus, ModifySuspendListData, UpdateUserData, GetSelfUserData } from '../controller/userController';
import { FetchUserFromHeader } from '../middleware/User/authMiddleware';
import { SuspendListValidation, CompareUserStatus, FoundUserFromParams, UserLoginDataValidation, UserRegisterDataValidation } from '../middleware/User/userValidationMiddleware';
import { GetUserDataService } from '../service/user/GetUserDataService';
import { BuildUserUpdateDataService } from '../service/user/userUpdateDataService';
import { LoginAndFindUser, ValidationForModifyStatus } from '../data/middlewareGroup';

const router = express.Router();

router.get('/UserData/tableName=:tableName', FetchUserFromHeader, GetUserDataService, GetUserData);
router.get('/UserData', UserModifySelfDataRules, FetchUserFromHeader, GetSelfUserData);

router.post('/Register', UserRegisterRules, UserRegisterDataValidation, UserRegister);
router.post('/Login', UserLoginRules, UserLoginDataValidation, UserLogin);

// For another data
router.put('/UserData/id=:id', UserModifyDataRules, ...LoginAndFindUser, FoundUserFromParams, BuildUserUpdateDataService, ChangeUserData);
router.put('/UserData/type=:type', ...LoginAndFindUser, UpdateUserData);

// For status only
router.put('/Status/id=:id', UserModifyDataRules, ...LoginAndFindUser, ...ValidationForModifyStatus, FoundUserFromParams, CompareUserStatus, ChangeStatus);
router.put('/SuspendListData/id=:id', UserModifyDataRules, ...LoginAndFindUser, FoundUserFromParams, SuspendListValidation, ModifySuspendListData);

router.delete('/User/id=:id', ...LoginAndFindUser, FoundUserFromParams, DeleteUser);

export default router;