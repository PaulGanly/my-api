import MessageResponse from '../interfaces/MessageResponse';
import { LibertyGPTReq } from '../interfaces/LibertyGPTReq';
import { LibertyGPTResp } from '../interfaces/LibertyGPTResp';
import got from 'got';
import express from 'express';

const router = express.Router();

router.post<{}, MessageResponse>('/', async (req, res) => {
  function buildGPTPrompt(body: LibertyGPTReq) {
    const testType = body.type.toLowerCase() == 'java' ? 'junit' : 'jest';
    return `Given this ${body.type} method: ${body.code} Using boundary value analysis and equivalence partitioning produce a parameterised ${testType} unit test that covers all valid scenarios. Return just the code, no extra text`;
  }

  const resp: LibertyGPTResp = await got.post('https://cortex.aws.lmig.com/rest/v2/azure/openai/deployments/GPT_35_TURBO/chat/completions?api-version=2023-05-15', {
    json: {
      messages: [
        {
          content: buildGPTPrompt(req.body as LibertyGPTReq),
          role: 'user',
        },
      ],
      use_case: 'testing',
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LIBERTY_GPT_ACCESSS}`,
      Accept: '*/*',
    },
  }).json();

  res.json({ message: resp.choices[0].message.content });
});

export default router;