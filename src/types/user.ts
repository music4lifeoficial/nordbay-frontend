export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  verified: boolean;
  role: "user" | "vendor" | "admin";
}
