import nodemailer from 'nodemailer';
import path from 'path';
import Twig from 'twig';
import { NODE_ENV, SMTP_HOST, PASS_MAIL, SEND_MAIL, URL_FRONT, MAIL_TEST } from '@configs/constants/env';
import { MEMBER_MAIL } from '@/types/emails/MEMBER_MAIL';

type EMAIL_TYPE = MEMBER_MAIL;

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    secure: NODE_ENV !== 'development',
    auth: {
        user: SEND_MAIL,
        pass: PASS_MAIL
    },
    logger: NODE_ENV === 'development'
});

export const sendMail = async (
    email: string | undefined,
    subject: string,
    htmlPath: EMAIL_TYPE,
    data: object | null = null
): Promise<void> => {
    const pathToTemplate = path.join(__dirname, '/templates/' + htmlPath);
    const pathToLogo = path.join(__dirname, '../../assets/images/giraph.png');

    const preData = {
        unsubscribeLink: `${URL_FRONT}/email/unsubscribe?token=${'zeokpdoek'}`
    };

    Twig.renderFile(pathToTemplate, { ...preData, ...data }, async (err, result) => {
        await transporter.sendMail({
            from: `"Enzo CANDOTTI de Paris Explore" <${SEND_MAIL}>`,
            to: NODE_ENV === 'development' ? MAIL_TEST : email,
            subject,
            html: result,
            attachments: [
                {
                    filename: 'logo.png',
                    path: pathToLogo,
                    cid: 'logoID'
                }
            ]
        });
    });
};
