import { Router } from 'express';
import { battle } from '../controllers/battleController';
import battleValidationMiddleware from '../middlewares/battleValidationMiddleware';

const battleRouter = Router();

battleRouter.post('/battle', battleValidationMiddleware, battle);

export default battleRouter;
