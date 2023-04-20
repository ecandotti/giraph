import { Request, Response } from 'express';
import crypto from 'crypto';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '@services/mail';
import memberService from '@services/memberService';
import { MEMBER_MAIL } from 'src/types/emails/MEMBER_MAIL';
import { JWT_SECRET } from '@configs/constants/env';
import { Member, MemberProfile, Prisma } from '.prisma/client';
import { ILogin } from '@/types/ILogin';
import { apiCache } from '@services/cache';

interface IMemberRegister extends Member, MemberProfile {
    confirmPassword: string;
}

export const getAllMembers = async (req: Request, res: Response) => {
    try {
        const members = await memberService.getAllMembers();

        apiCache.set('members', members, 60 * 5);

        return res.status(200).send({
            success: true,
            members
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Erreur lors de la récupération des Membres.'
        });
    }
};

export const getOneMember = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }

    try {
        const member = await memberService.getOneMember(Number(id));

        return res.status(200).send({
            success: true,
            member
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Membre inconnu en base de données.'
        });
    }
};

export const registerMember = async (req: Request, res: Response) => {
    const { email, password, acceptCGU } = req.body as IMemberRegister;

    if (email !== null && password !== null && acceptCGU !== null) {
        try {
            const newMember = await memberService.registerMember(email, password, acceptCGU);

            if (newMember) {
                await sendMail(email, 'Confirmation de création de compte', MEMBER_MAIL.CONFIRM_REGISTER, {
                    username: email.split('@')[0]
                });

                const token = jwt.sign(newMember, JWT_SECRET);

                return res.status(200).send({
                    success: true,
                    token
                });
            }

            return res.status(200).send({
                success: false,
                message: 'Erreur'
            });
        } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error?.code === 'P2002') {
                    return res.status(200).send({
                        success: false,
                        message: 'Email ou pseudo déjà pris.'
                    });
                }
            }

            return res.status(200).send({
                success: false,
                message: 'Erreur'
            });
        }
    } else {
        return res.status(200).send({
            success: false,
            message: 'Email ou mot de passe vide.'
        });
    }
};

export const loginMember = async (req: Request, res: Response) => {
    const { email, password } = req.body as ILogin;

    try {
        const member = await memberService.loginMember(email);

        if (member && compareSync(password, member.password)) {
            const token = jwt.sign(member, JWT_SECRET);

            return res.status(200).send({
                success: true,
                token
            });
        } else {
            return res.status(200).send({
                success: false,
                message: 'Email ou mot de passe incorrect.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            success: false,
            message: 'Erreur système.'
        });
    }
};

export const updateMember = async (req: Request, res: Response) => {
    return res.status(200).send({
        success: true,
        message: 'ok'
    });
};

export const deleteMember = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id !== null) {
        try {
            await memberService.deleteMember(Number(id));

            return res.status(200).send({
                success: true,
                message: 'Membre supprimé avec succès.'
            });
        } catch (error) {
            return res.status(200).send({
                success: false,
                message: 'Erreur lors de la suppression du Membre.'
            });
        }
    } else {
        return res.status(200).send({
            success: false,
            message: 'ID non renseigné.'
        });
    }
};
