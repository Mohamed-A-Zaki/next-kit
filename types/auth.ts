export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface UserData extends User {
  accessToken: string;
}
