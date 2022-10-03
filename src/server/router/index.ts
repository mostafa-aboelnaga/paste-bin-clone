// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { snippetRouter } from "./snippet";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("snippet.", snippetRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
