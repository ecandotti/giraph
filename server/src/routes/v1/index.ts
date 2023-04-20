import { Router, Request, Response } from 'express';
import { v1MemberRouter } from './memberRoutes';
import { v1FlagRouter } from './flagRoutes';
import { v1ProjectRouter } from './projectRoutes';
import { v1SprintRouter } from './sprintRoutes';
import { v1TicketRouter } from './ticketRoutes';

const v1IndexRouter = Router();

v1IndexRouter.get('/ping', async (req: Request, res: Response) => {
    return res.status(200).send({
        success: true,
        message: 'Hello.'
    });
});

export const v1Router = [v1IndexRouter, v1MemberRouter, v1ProjectRouter, v1SprintRouter, v1TicketRouter, v1FlagRouter];
