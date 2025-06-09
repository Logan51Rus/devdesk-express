import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { validateUserRegistrationBody, validateUserLoginBody } from '../middlewares/validation/userValidation';

const router = Router();

router.post('/signup', validateUserRegistrationBody, registerUser);
router.post('/signin', validateUserLoginBody, loginUser);


export default router;