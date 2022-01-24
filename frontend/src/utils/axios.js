import axios from 'axios';
import { checkAuth } from './auth';
// require('dotenv').config()

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/',
  // timeout: 10000
});

export default instance;