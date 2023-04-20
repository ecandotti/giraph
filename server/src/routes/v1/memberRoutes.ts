import { Router } from 'express';
import { loginMember, registerMember } from 'src/controllers/memberController';

export const v1MemberRouter = Router({
    strict: true,
    caseSensitive: true
});

v1MemberRouter.post('/member/register', registerMember);
v1MemberRouter.post('/member/login', loginMember);
