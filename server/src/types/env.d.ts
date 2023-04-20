import { Member, MemberProfile, Mentor } from '@prisma/client';

export interface IFullMember extends Member {
    profile: MemberProfile;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'staging' | 'production';
            DATABASE_URL: string;
            SMTP_HOST: string;
            SEND_MAIL: string;
            PASS_MAIL: string;
            APPLE_APP_ID: string;
            APPLE_TEAM_ID: string;
            APPLE_KEY_ID: string;
            PORT?: string;
            JWT_SECRET: string;
            URL_FRONT: string;
        }
    }

    namespace Express {
        interface Request {
            member?: IFullMember;
        }
    }
}

export {};
