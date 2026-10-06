export interface User {
  username: string;
  password: string;
  role: "ADMIN" | "AGENT";
}

export const admin: User = {
  username: "admin.qrius",
  password: "Admin@123",
  role: "ADMIN",
};
export const agent: User = {
  username: "agent.qrius",
  password: "Agent@123",
  role: "AGENT",
};

export const SEEDED_LEAD_COUNT = 12;
export const STATUSES = ['New', 'Contacted', 'Qualified', 'Lost'];
