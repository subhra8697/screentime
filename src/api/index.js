import axios from 'axios';

const API = axios.create({ baseURL: `https://api.tvmaze.com/` }); 

export const getAllShows = async () => await API.get('/shows');
export const searchShows = async (name) => await API.get(`/search/shows?q=${name}`);
export const getShowDetails = async (id) => await API.get(`/shows/${id}`);