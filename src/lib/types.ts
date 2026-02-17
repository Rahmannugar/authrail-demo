export type User = {
  id: string;
  email: string;
  role: "user" | "admin";
};

export type AppContext = {
  user: User | null;
  blockDashboard?: boolean;
  allowAdmin?: boolean;
};
