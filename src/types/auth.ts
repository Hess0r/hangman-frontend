export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  name?: string;
};

export type AuthState = {
  status: "init" | "authenticated" | "unauthenticated";
  loading: boolean;
  token: string | null;
  user: User | null;
};

export type GetUserResponse = {
  data: User;
};

export type LoginResponse = {
  token: string;
};
