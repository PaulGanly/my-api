import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies

const router = express.Router();

router.post<{}, string>('/install', async (req, res) => {
  console.log(__dirname);
  const dir = `./cloned/${req.body.name}`;
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const mvn = require('maven').create({
      cwd: dir,
      debug: true,
    });
    await mvn.execute(['clean', 'install'], { 'skipTests': true }).then(() => {
      // As mvn.execute(..) returns a promise, you can use this block to continue
      // your stuff, once the execution of the command has been finished successfully.
      console.log('Installed');
    }).catch(() => {
      console.log('Error');
    });
  } catch (e) {
    console.log(e);
  }

  res.json('{}');
});

export default router;