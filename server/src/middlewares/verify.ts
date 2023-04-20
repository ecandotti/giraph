import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from 'src/configs/constants/env';
import { IFullMember } from 'src/types/env';

export const verify = (req: Request, res: Response, next: NextFunction, role: Role) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'Token manquant.'
        });
    }

    jwt.verify(token, JWT_SECRET, (error: any, jwtDecoded) => {
        const decoded = jwtDecoded as IFullMember;
        const isValid = decoded.role === role;

        if (error || !isValid) {
            return res.status(401).send({
                success: false,
                message: 'Non authorisé.'
            });
        }

        req.member = decoded;
        next();
    });
};
