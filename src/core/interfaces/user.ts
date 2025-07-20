export interface UserAttributes {
  id?: string;
  user_name: string;
  email: string;
  password: string;
  is_verified: boolean;
  is_admin: boolean;
}



export interface UserRegistrationRequest {
  user_name: string;
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
  user_name: string;
}

export interface ProfileResponse {
  email: string;
}

export interface LogOutUser {
  token: string;
}
