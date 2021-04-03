import { Request, Response } from 'express';

export function getMain(_: Request, res: Response) {
    res.render('main');
}

export function getPageNotFound(_: Request, res: Response) {
    res.render('404');
}
