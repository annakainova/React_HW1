import axios from "axios";

export default class TasksService {
  static async getTasks(url) {
    try {
      const responce = await axios.get(url);
      return responce.data;
    } catch (e) {
      console.log(e);
    }
  }
}
