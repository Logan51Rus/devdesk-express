import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { validateUserRegistrationBody, validateUserLoginBody } from '../middlewares/validation/userValidation';
import { auth } from '../middlewares/auth/auth';

const router = Router();

router.post('/signup', validateUserRegistrationBody, registerUser);
router.post('/signin', validateUserLoginBody, loginUser);

// Тестирование защиты маршрута
router.get('/me', auth, (req, res) => {
    res.status(200).send({ message: 'Доступ разрешен', user: req.user })
})

export default router;