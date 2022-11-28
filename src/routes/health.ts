import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import healthService from '@services/health';

const router = Router();

export const paths = {
  liveness: '/liveness',
  readiness: '/readiness',
} as const;

router.get(paths.liveness, (_: Request, res: Response) => {
  const data = healthService.liveness();

  return res.status(StatusCodes.OK).json({ data });
});

router.get(paths.readiness, (_: Request, res: Response) => {
  const data = healthService.readiness();

  return res.status(StatusCodes.OK).json({ data });
});

export default router;
