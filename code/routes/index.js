import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const proxyTable = {
  '/accountsApi': 'https://aa-accounts-ms-sprint-2-2.onrender.com/',
  '/progressApi': 'https://aa-progress-ms-sprint-2-2.onrender.com/',
  '/questionnaireApi': 'https://aa-questionnaire-ms-sprint-2-2.onrender.com/',
};

const options = {
  router: proxyTable,
  pathRewrite: {
    '^/accountsApi': '',
    '^/progressApi': '',
    '^/questionnaireApi': '',
  },
  changeOrigin: true,
  onProxyReq: fixRequestBody,
};

const myProxy = createProxyMiddleware(options);

router.get('/', cors(), (req, res, next) => {
  res.json('Hi, this is the apigateway');
});

try {
  router.use('/', cors(), myProxy);
} catch (err) {
  console.log(err);
}

export { router, myProxy };
