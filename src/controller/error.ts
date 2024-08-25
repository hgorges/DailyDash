import { NextFunction, Request, Response } from 'express-serve-static-core';

export function renderErrorPage(
    req: Request,
    res: Response,
    _next: NextFunction,
): void {
    res.status(500).render('error', {
        path: '/error',
        isAdmin: req.session.isAdmin,
    });
}

export function errorHandler(
    error: any,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    console.error(error);
    res.redirect(`/error`);
}