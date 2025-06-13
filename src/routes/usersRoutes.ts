import { Router } from 'express';
import { registerUser, loginUser, refreshToken, logoutUser } from '../controllers/userController';
import { validateUserRegistrationBody, validateUserLoginBody } from '../middlewares/validation/userValidation';
import { auth } from '../middlewares/auth/auth';

const router = Router();

router.post('/signup', validateUserRegistrationBody, registerUser);
router.post('/signin', validateUserLoginBody, loginUser);
router.post('/refresh', refreshToken);
router.post('/logout', logoutUser);

// Тестирование защиты маршрута
router.get('/me', auth, (req, res) => {
    res.status(200).send({ message: 'Доступ разрешен', user: req.user })
})

export default router;