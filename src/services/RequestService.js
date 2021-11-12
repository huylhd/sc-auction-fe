/* eslint-disable no-restricted-globals */
import axios from 'axios';
const Axios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL + '/api/v1'
})

const RequestPost = async (path, payload = {}) => {
  try {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    const response = await Axios.post(path, payload, {
      headers
    });

    return response.data
  } catch (err) {
    if (err?.response?.data) {
      if (err.response.data?.code === 401) {
        localStorage.removeItem('token');
        location.href = '/login';
      }
      return err.response.data;
    }
    return {
      success: false,
      message: 'Connection failed. Please try again'
    }
  }
}

const RequestGet = async (path) => {
  try {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    const response = await Axios.get(path, {
      headers
    });

    return response.data
  } catch (err) {
    if (err?.response?.data) {
      if (err.response.data?.code === 401) {
        localStorage.removeItem('token');
        location.href = '/login';
      }
      return err.response.data;
    }
    return {
      success: false,
      message: 'Connection failed. Please try again'
    }
  }
}

export { RequestPost, RequestGet }