import { Router } from "express";
import { getTasks, createTask } from "../controllers/taskController";
import { taskValidationBody } from "../middlewares/validation/taskValidation";
import { auth } from "../middlewares/auth/auth";

const router = Router();

router.get('/', auth, getTasks);
router.post('/', auth, taskValidationBody, createTask);

export default router;
