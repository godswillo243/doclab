import app from "./app";
import { env } from "./config/env";
import { db } from "./db";

const server = app.listen(env.PORT, () => {
  console.log(`\n=> Server running on port ${env.PORT}`);
});

(async () => {
  await db.execute("SELECT 1");
  console.log("=> Database connected");
})();

const shutdown = (signal: string) => {
  console.log(`\n${signal} received. Shutting down...`);

  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
