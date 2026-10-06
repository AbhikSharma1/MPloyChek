export type UserRole = 'Admin' | 'General User';

export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  status: string;
  joinedDate: string;
}

export interface LoginPayload {
  userId: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface EmploymentRecord {
  id: string;
  type: string;
  description: string;
  date: string;
  status: string;
  userId?: string;
}
