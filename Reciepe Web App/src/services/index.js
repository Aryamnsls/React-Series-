import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
});
