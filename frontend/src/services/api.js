import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001", // URL backend
});

export const createTransaction = (data) => API.post("/Proses_payment", data);