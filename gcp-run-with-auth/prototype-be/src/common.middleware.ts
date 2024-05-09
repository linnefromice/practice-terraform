import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, _: Response, next: NextFunction) => {
  console.log({
    time: new Date().toISOString(),
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
  });
  next();
};
