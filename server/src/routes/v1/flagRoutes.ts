import { createFlag, deleteFlag, getAllFlags, getOneFlag, updateFlag } from '@controllers/flagController';
import { Router } from 'express';

export const v1FlagRouter = Router({
    strict: true,
    caseSensitive: true
});

v1FlagRouter.post('/flag', createFlag);
v1FlagRouter.get('/flag', getAllFlags);
v1FlagRouter.get('/flag/:id', getOneFlag);
v1FlagRouter.put('/flag/:id', updateFlag);
v1FlagRouter.delete('/flag/:id', deleteFlag);
