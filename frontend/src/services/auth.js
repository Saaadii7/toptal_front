import axios from '../utils/axios';
import ApiClient from '../utils/apiClient';
import { setAuth, setUser } from '../utils/auth';

export const login = async data => {
  const result = await ApiClient.doRequest('post','users/login', data);
  setAuth(result.token)
  setUser(result.user.data)
  return result;
}
