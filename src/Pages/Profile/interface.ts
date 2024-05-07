export interface IProfileResponse {
  id: number;
  name: string;
  email: string;
  location: string;
  password: string;
  preferences: null;
  genre: string;
}

export interface IUpdateUserData {
  message: string;
  token: null;
  name: null;
  success: boolean;
}
