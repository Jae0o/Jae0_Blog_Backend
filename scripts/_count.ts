import { db } from 'config/firebase';

async function main() {
  for (const c of ['categories', 'siteConfig', 'posts', 'tils']) {
    const snap = await db.collection(c).get();
    console.log(`${c}: ${snap.size}`);
  }
  process.exit(0);
}
main();
