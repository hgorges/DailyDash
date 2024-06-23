import express, { NextFunction, Response } from 'express';
import { dashboardController } from '../controller/dashboard';
import { googleAuthController } from '../controller/google-auth';
import { AuthRequest, castPromiseToVoid } from '../utils/utils';

const router = express.Router();

router.get(
    '/',
    castPromiseToVoid(dashboardController) as express.RequestHandler
);

router.post('/switch-location', ((
    req: AuthRequest,
    res: Response,
    _next: NextFunction
) => {
    req.session.isHome = !req.session.isHome;
    res.redirect('/');
}) as express.RequestHandler);

router.get('/google-auth', castPromiseToVoid(googleAuthController));

router.get('/not-found', (_req, res) => {
    res.status(404).render('not-found', {
        path: '/not-found',
    });
});

router.use((req, res) => {
    console.log(`Redirecting from ${req.url} to /not-found`);
    res.redirect('/not-found');
});

export default router;
