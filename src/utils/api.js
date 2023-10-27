import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  // Puedes agregar más configuraciones de Axios aquí según tus necesidades
});

export default instance;

export const getPost = () => {
  return instance.get("/posts");
};

export const createPost = (newPost) => {
  return instance.post("/posts", newPost);
};
