import { celebrate, Joi, Segments } from "celebrate";

const userRegistrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    name: Joi.string().min(5).max(32).required(),
    role: Joi.string().valid('user', 'admin').required()
})

const validateUserRegistrationBody = celebrate({
    [Segments.BODY]: userRegistrationSchema,
})

export { validateUserRegistrationBody }