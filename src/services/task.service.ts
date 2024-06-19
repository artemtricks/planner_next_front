import { axiosWithAuth } from "@/api/interseptors";
import { ITaskResponse, TypeTaskFormState } from "@/types/task.types";

class TaskService {
  private BASE_URL = "/user/tasks";

  async getTasks() {
    const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL);
    return response;
  }

  async createTasks(data: TypeTaskFormState) {
    const response = await axiosWithAuth.post(this.BASE_URL, data);
    return response;
  }

  async updateTasks(id: string, data: TypeTaskFormState) {
    const response = await axiosWithAuth.post(`${this.BASE_URL}/${id}`, data);
    return response;
  }
}
export const taskService = new TaskService();
