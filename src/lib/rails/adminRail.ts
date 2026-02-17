import { createRail, requireAuth, requireRole, allowIf } from "authrail";
import type { AppContext } from "../types";

export const adminRail = createRail<AppContext>(
  "admin",
  [
    requireAuth("/login"),
    requireRole("admin"),
    allowIf((ctx) => ctx.allowAdmin === true),
  ],
  { debug: true },
);
