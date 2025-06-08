import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import { validateUserRegistrationBody } from '../middlewares/validation/userValidation';

const router = Router();

router.post('/signup', validateUserRegistrationBody, registerUser)

export default router;