import { mkdirSync } from 'node:fs';

import { build } from 'esbuild';

// Vercel 배포 전용 번들. @vercel/node는 tsconfig baseUrl(베어 임포트)을 런타임에 해석하지 못하므로,
// src/app.ts를 의존성 그래프째 단일 파일(api/_bundle.cjs)로 묶어 베어 임포트를 전부 인라인한다.
// node_modules(express·firebase-admin·zod)는 external로 두어 런타임에 node_modules에서 로드한다.
await build({
  entryPoints: ['src/app.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  outfile: 'api/_bundle.cjs',
  external: ['express', 'zod', 'firebase-admin', 'firebase-admin/*'],
});

// Other 프리셋의 정적 출력 디렉터리(빌드 후 존재 필요). 비어 있어 노출되는 소스 없음.
mkdirSync('public', { recursive: true });
