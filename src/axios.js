import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-d9201.cloudfunctions.net/api",
});

export default instance;
