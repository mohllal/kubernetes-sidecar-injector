import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { V1Pod } from "@kubernetes/client-node";

import type { V1AdmissionRequest, V1AdmissionReview } from "@type/kubernetes";
import mutationService from '@services/mutation';

const router = Router();

export const paths = {
  mutate: '/pod',
} as const;

router.post(paths.mutate, (req: Request, res: Response) => {
  const admissionReview: V1AdmissionReview<V1Pod> = req.body;

  const admissionReviewRequest = admissionReview.request as V1AdmissionRequest<V1Pod>;
  const admissionReviewResponse = mutationService.handle(admissionReviewRequest);

  admissionReview.response = admissionReviewResponse;
  return res.status(StatusCodes.OK).json(admissionReview);
});

export default router;
