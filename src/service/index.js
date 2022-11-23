import axios from "axios";

const URL = "https://preguntados-api.vercel.app/api/";

export const API = {
  getDifficulties: () => {
    return axios.get(`${URL}difficulty`);
  },
  getQuestions: (difficulty) => {
    const path = difficulty
      ? "questions?difficulty=" + difficulty
      : "questions";
    return axios.get(URL + path);
  },
  answer: (questionId, option) => {
    return axios.post(URL + "answer", {
      questionId,
      option
    });
  }
};
