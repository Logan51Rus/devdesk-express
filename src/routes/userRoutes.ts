import { Router } from 'express';
import { registerUser, loginUser, refreshToken, logoutUser, getUser, updateUser, deleteUser } from '../controllers/userController';
import { validateUserRegistrationBody, validateUserLoginBody } from '../middlewares/validation/userValidation';
import { auth } from '../middlewares/auth/auth';

const router = Router();

router.post('/signup', validateUserRegistrationBody, registerUser);
router.post('/signin', validateUserLoginBody, loginUser);
router.post('/refresh', refreshToken);
router.post('/logout', logoutUser);

router.get('/me', auth, getUser);
router.patch('/me', auth, updateUser);
router.delete('/me', auth, deleteUser);

export default router;