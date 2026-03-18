import { AuthIdValidation, FetchUserFromHeader } from "../middleware/User/authMiddleware";
import { SuspendListValidation } from "../middleware/User/userValidationMiddleware";

export const LoginAndFindUser = [FetchUserFromHeader, AuthIdValidation];
export const ValidationForModifyStatus = [SuspendListValidation];