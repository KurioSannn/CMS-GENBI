import type { NextApiRequest, NextApiResponse } from 'next';
import authController from '@/lib/controllers/auth.controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return authController.me(req, res);
}
