export type Role = 'ADMIN' | 'AGENT';

export interface User {
  username: string;
  password: string;
  role?: Role; 
}

export const admin: User = {
  username: 'admin.qrius',
  password: 'Admin@123',
  role: 'ADMIN',
};

export const agent: User = {
  username: 'agent.qrius',
  password: 'Agent@123',
  role: 'AGENT',
};

export const wrongPasswordUser: User = {
  username: 'admin.qrius',
  password: 'WrongPass@1',
};
