export interface UserAttributes {
  id?: string;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  is_admin: boolean;
}



export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
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
  token: string;
}

export interface GetUserProfileData {
  username: string;
}

export interface ProfileResponse {
  email: string;
}

export interface LogOutUser {
  token: string;
}
