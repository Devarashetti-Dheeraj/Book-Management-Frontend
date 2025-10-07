import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8000/api",  //use this to just use pre declared url instead of manually typing it everytime. (axios.get("http://localhost:8000/api"))
=======
  baseURL: "http://localhost:8000/api/",  //use this to just use pre declared url instead of manually typing it everytime. (axios.get("http://localhost:8000/api"))
>>>>>>> 5e56ae118495c6c870332730c70e004d8619c4e0
})

export default API;