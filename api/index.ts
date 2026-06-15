// Vercel @vercel/node 진입점. 모든 경로는 vercel.json rewrites로 여기에 도달한다.
// 실제 앱은 빌드 시 esbuild가 번들한 _bundle.cjs(베어 임포트 인라인됨)에서 가져온다.
// (직접 ../src/app을 import하면 @vercel/node가 베어 임포트를 런타임에 해석 못 해 실패한다.)
import app from './_bundle.cjs';

export default app;
