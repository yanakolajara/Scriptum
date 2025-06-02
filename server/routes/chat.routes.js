import { Router } from 'express';

export const createEntriesModel = (entryModel) => {
  const router = Router();
  router.get('/', () => {});
  return router;
};
