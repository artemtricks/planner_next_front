export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  name?: string;
  workInterval?: number;
  breakInterval?: number;
  intervalCount?: number;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export type IUserForm = Omit<IUser, "id"> & { password?: string };
