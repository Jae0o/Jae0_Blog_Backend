import { Router } from 'express';

import { openapiDocument } from './openapi.document';

/**
 * `/api/docs` 라우터.
 * - `GET /api/docs` → CDN에서 Swagger UI를 로드하는 미니 HTML (정적 자산 번들 불필요 → Vercel 서버리스 안전).
 * - `GET /api/docs/openapi.json` → 손수 작성한 OpenAPI 3.0 문서.
 */
const docsRouter = Router();

const SWAGGER_UI_VERSION = '5';

const DOCS_HTML = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>jae0.dev API Docs</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui-bundle.js" crossorigin></script>
    <script>
      window.ui = SwaggerUIBundle({ url: '/api/docs/openapi.json', dom_id: '#swagger-ui' });
    </script>
  </body>
</html>
`;

docsRouter.get('/openapi.json', (_req, res) => {
  res.json(openapiDocument);
});

docsRouter.get('/', (_req, res) => {
  res.type('html').send(DOCS_HTML);
});

export { docsRouter };
