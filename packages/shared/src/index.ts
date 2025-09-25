export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export type HealthStatus = {
  status: "ok" | "error";
  timestamp: string;
};
