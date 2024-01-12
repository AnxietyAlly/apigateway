import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const proxyTable = {
  '/accountsApi': 'https://aa-accounts-ms-sprint-3.onrender.com/',
  '/articlesApi': 'https://aa-robodoc-ms-sprint-3.onrender.com',
  '/progressApi': 'https://aa-progress-ms-sprint-3.onrender.com/',
  '/questionnaireApi': 'https://aa-questionnaire-ms-sprint-3.onrender.com/',
  '/quotesApi': 'https://aa-quotes-ms-sprint-3.onrender.com',
  '/robodocApi': 'https://aa-robodoc-ms-sprint-3.onrender.com',
  //'/accountsApi': 'http://msaccounts:3011',
  //'/progressApi': 'http://progress:3013',
  //'/questionnaireApi': 'http://questionnaire:3012',
};

const options = {
  router: proxyTable,
  pathRewrite: {
    '^/accountsApi': '',
    '^/articlesApi': '',
    '^/progressApi': '',
    '^/questionnaireApi': '',
    '^/quotesApi': '',
    '^/robodocApi': '',
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
