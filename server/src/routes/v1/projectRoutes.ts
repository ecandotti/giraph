import { createProject, deleteProject, getAllProjects, getOneProject, updateProject } from '@controllers/projectController';
import { verify } from '@middlewares/verify';
import { Router } from 'express';

export const v1ProjectRouter = Router({
    strict: true,
    caseSensitive: true
});

v1ProjectRouter.post('/project', (req, res, next) => verify(req, res, next, 'DEVELOPER'), createProject);
v1ProjectRouter.get('/project', getAllProjects);
v1ProjectRouter.get('/project/:id', getOneProject);
v1ProjectRouter.put('/project/:id', updateProject);
v1ProjectRouter.delete('/project/:id', deleteProject);
