import axios from '../utils/axios';
import ApiClient from '../utils/apiClient';

export const all = async data => {
  return await ApiClient.doRequest('get','eatables', data);
}
