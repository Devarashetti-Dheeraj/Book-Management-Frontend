import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",  //use this to just use pre declared url instead of manually typing it everytime. (axios.get("http://localhost:8000/api"))
})

export default API;
