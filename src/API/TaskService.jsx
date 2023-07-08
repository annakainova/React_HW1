import axios from "axios";

export default class TasksService {
  static async getTasks(url) {
    const responce = await axios.get(url);
    return responce.data;
  }
}
