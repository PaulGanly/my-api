import express from 'express';
import path from 'path';
import * as cp from 'child_process';

const router = express.Router();

router.post<{}, string>('/install', async (req, res) => {
  console.log(__dirname);
  const dir = path.join(__dirname, '../../cloned', `${req.body.name}`);
  try {
    cp.spawnSync( 'npm', ['install'], {
      stdio: 'inherit',
      cwd: dir,
    });
  } catch (e) {
    console.log(e);
  }

  res.json('{}');
});

export default router;