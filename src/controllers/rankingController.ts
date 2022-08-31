import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import * as rankingService from '../services/rankingService';

async function ranking(req: Request, res: Response) {
  try {
    const ranking = await rankingService.getRanking();
    res.send(ranking).status(httpStatus.OK);
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export { ranking };
