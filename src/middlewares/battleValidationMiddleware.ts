import battleSchema from '../utils/schemas';
import { Request, Response } from 'express';

async function battleValidationMiddleware(
  req: Request,
  res: Response,
  next: any
) {
  try {
    await battleSchema.validateAsync(req.body);
  } catch (error) {
    return res.sendStatus(500);
  }
  next();
}

export default battleValidationMiddleware;
