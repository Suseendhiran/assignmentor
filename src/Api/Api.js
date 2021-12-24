import axios from "axios";

export default axios.create({
  baseURL: "https://assignmentor9.herokuapp.com/",
  responseType: "json",
});
