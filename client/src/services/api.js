import axios from "axios";

const API = axios.create({
    baseURL: "https://financeassistant-5me8.onrender.com/api"
});

export default API;