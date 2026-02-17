import type { User } from "../types";

const users: Record<string, User> = {
  admin: { id: "1", email: "admin@test.com", role: "admin" },
  user: { id: "2", email: "user@test.com", role: "user" },
};

export async function login(type: "admin" | "user") {
  await new Promise((res) => setTimeout(res, 800));
  return users[type];
}

export async function fetchUser(id: string) {
  await new Promise((res) => setTimeout(res, 600));
  return Object.values(users).find((u) => u.id === id) ?? null;
}
