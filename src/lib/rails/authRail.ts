import { createRail, requireAuth, blockIf } from "authrail";
import type { AppContext } from "../types";

export const authRail = createRail<AppContext>(
  "auth",
  [requireAuth("/login"), blockIf((ctx) => ctx.blockDashboard === true)],
  { debug: true },
);
