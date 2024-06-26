import { axiosWithAuth } from "@/api/interseptors";
import { IUser, IUserForm } from "@/types/auth.types";

export interface IProfileResponse {
  user: IUser;
  statistics: {
    value: string;
    label: string;
  }[];
}

class UserService {
  private BASE_URL = "user/profile";

  async getProfile() {
    const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL);
    return response.data;
  }

  async update(data: IUserForm) {
    const response = await axiosWithAuth.put(this.BASE_URL, data);
    return response.data;
  }
}

export const userService = new UserService();
