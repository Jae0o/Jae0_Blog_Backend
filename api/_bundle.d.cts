// api/index.ts가 import하는 런타임 번들(_bundle.cjs)의 타입 선언.
// _bundle.cjs는 빌드 시 esbuild가 생성(gitignore)하며 런타임엔 Express 앱을 default export한다.
// NodeNext가 './_bundle.cjs' import의 타입을 이 .d.cts에서 찾으므로 TS7016 없이 타입이 잡힌다.
import type { Application } from 'express';

declare const app: Application;
export default app;
