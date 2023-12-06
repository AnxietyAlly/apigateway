import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const proxyTable = {
  '/progressApi': 'https://anxietyally-progress-microservice.onrender.com',
  '/questionnaireApi': 'https://questionnaire-microservice.onrender.com',
  '/accountsApi': 'https://anxietyally-accounts-microservice.onrender.com'
};

const options = {
  router: proxyTable,
  pathRewrite: {
    '^/progressApi': '',
    '^/questionnaireApi': '',
    '^/accountsApi': ''
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
