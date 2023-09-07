import express from 'express';
import * as git from 'isomorphic-git';
import * as fs from 'fs';
import * as http from 'isomorphic-git/http/node';
import path from 'path';

const router = express.Router();

interface IDir {
  name: string;
  dirs: IDir[];
  files: string[];
}

function getDirectoryContents(dirPath: string): IDir {
  const name = path.basename(dirPath);
  const dirs: IDir[] = [];
  const files: string[] = [];

  const filesAndDirs = fs.readdirSync(dirPath);

  for (const item of filesAndDirs) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      dirs.push(getDirectoryContents(itemPath));
    } else {
      files.push(item);
    }
  }

  return {
    name,
    dirs,
    files,
  };
}


router.post<{}, IDir>('/clone', async (req, res) => {
  console.log(__dirname);
  const repoUrl = req.body.repoUrl;
  const dir = `./cloned/${req.body.name}`;
  try {
    await git.clone({
      fs,
      http,
      url: repoUrl,
      onAuth: () => ({ username: process.env.GITHUB_ACCESS }),
      dir,
    });
  } catch (e) {
    console.log(e);
  }

  res.json(getDirectoryContents(dir));
});

export default router;