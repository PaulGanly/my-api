import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import libertyGpt from './libertyGpt';
import git from './git';
import mvn from './mvn';
import npm from './npm';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Auto Test API - 👋🌎🌍🌏',
  });
});

router.use('/generate-test', libertyGpt);
router.use('/repo', git);
router.use('/mvn', mvn);
router.use('/npm', npm);


export default router;
