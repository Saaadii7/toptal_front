import axios from '../utils/axios';
import ApiClient from '../utils/apiClient';

export const all = async data => {
  return await ApiClient.doRequest('get','eatables', data);
}

export const create = async data => {
  return await ApiClient.doRequest('post','eatables', data);
}

export const update = async (id, data) => {
  return await ApiClient.doRequest('post',`eatables/${id}`, data);
}

export const destroy = async (id) => {
  return await ApiClient.doRequest('delete',`eatables/${id}`);
}

