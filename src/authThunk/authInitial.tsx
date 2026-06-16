export type AuthState = {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

export const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};