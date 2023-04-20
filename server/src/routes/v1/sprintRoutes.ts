import { createSprint, deleteSprint, getAllSprints, getOneSprint, updateSprint } from '@controllers/sprintController';
import { Router } from 'express';

export const v1SprintRouter = Router({
    strict: true,
    caseSensitive: true
});

v1SprintRouter.post('/sprint', createSprint);
v1SprintRouter.get('/sprint', getAllSprints);
v1SprintRouter.get('/sprint/:id', getOneSprint);
v1SprintRouter.put('/sprint/:id', updateSprint);
v1SprintRouter.delete('/sprint/:id', deleteSprint);
