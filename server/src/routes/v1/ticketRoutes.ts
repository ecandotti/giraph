import { createTicket, deleteTicket, getAllTicketsByProject, getOneTicket, updateTicket } from '@controllers/ticketController';
import { verify } from '@middlewares/verify';
import { Router } from 'express';

export const v1TicketRouter = Router({
    strict: true,
    caseSensitive: true
});

v1TicketRouter.post('/ticket', (req, res, next) => verify(req, res, next, 'DEVELOPER'), createTicket);
v1TicketRouter.get('/ticket/:projectId/:status', getAllTicketsByProject);
v1TicketRouter.get('/ticket/:id', getOneTicket);
v1TicketRouter.put('/ticket/:id', updateTicket);
v1TicketRouter.delete('/ticket/:id', deleteTicket);
