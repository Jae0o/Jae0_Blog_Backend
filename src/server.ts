import app from "@/app";
import { PORT } from "@/config";

const PORT_NUMBER = PORT || 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃   Server listening on port: ${PORT_NUMBER}    ┃
  ┃     http://localhost:${PORT_NUMBER}/api       ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  `);
});
