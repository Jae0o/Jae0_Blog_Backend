import { PORT } from "@config";

import app from "@/app";

const PORT_NUMBER = PORT || 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃   Server listening on port: ${PORT_NUMBER}    ┃
  ┃  http://localhost:${PORT_NUMBER}/service/api  ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  `);
});
