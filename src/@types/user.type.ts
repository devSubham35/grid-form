export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  organization: {
    name: string;
  };
}

export interface LoginPayload {
    email: string;
    password: string;
}
