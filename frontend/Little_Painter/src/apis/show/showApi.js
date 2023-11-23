import axios from 'axios';
import {BASE_URL} from '../baseUrl';

export const callShowListApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/child_work/urlGif`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log('fall');
    console.error(error);
    return error.response;
  }
};
