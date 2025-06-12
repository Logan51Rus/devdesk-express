import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Authorization is required' })
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
        payload = jwt.verify(token, process.env.ACCESS_TOKEN!);
    } catch (e) {
        res.status(401).send({ message: 'Authorization is required' });
    }

    req.user = payload;

    next()
}