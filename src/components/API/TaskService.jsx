import axios from "axios";

export default class TasksService {
  static async getTasks() {
    try {
      const responce = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return responce.data;
    } catch (e) {
      console.log(e);
    }
  }
}
