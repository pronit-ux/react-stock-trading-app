import axios from "axios";

const TOKEN = "cj57e61r01qpipia6hi0cj57e61r01qpipia6hig";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
