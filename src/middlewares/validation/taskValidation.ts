import { celebrate, Joi, Segments } from "celebrate";
import { priority } from "../../generated/prisma";

const taskValidationSchema = Joi.object({
    title: Joi.string().min(6).max(150).required(),
    description: Joi.string().required(),
    status: Joi.string().valid('open', 'in_progress', 'resolved', 'reopened').required(),
    priority: Joi.string().valid('low', 'medium', 'high', 'critical').required(),
})

const taskValidationBody = celebrate({
    [Segments.BODY]: taskValidationSchema,
});

export { taskValidationBody };