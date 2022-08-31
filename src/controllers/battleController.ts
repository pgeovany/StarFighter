import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import * as battleService from '../services/battleService';

async function battle(req: Request, res: Response) {
  const { firstUser, secondUser }: { firstUser: string; secondUser: string } =
    req.body;

  try {
    const result = await battleService.battle(firstUser, secondUser);
    res.send(result).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { battle };
