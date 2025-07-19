export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  bio?: string;
  image?: string;
  is_verified: boolean;
  is_admin: boolean;
  reputation: number;
}


export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
  phone: string;
  bio?: string;
  image?: string;
}

export interface UserRegistrationResponse {
  message: string;
  user: any;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  email: string;
  phone: string;
  token: string;
  bio?: string;
  image?: string;
}

export interface UpdateUserProfile {
  phone?: string;
  bio?: string;
  image?: string;
}

export interface GetUserProfileData {
  username: string;
}

export interface ProfileResponse {
  email: string;
  phone: string;
  bio?: string;
  image?: string;
}

export interface LogOutUser {
  token: string;
}
