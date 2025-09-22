export interface User {
  pk: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

