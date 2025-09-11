import axios from 'axios';


// takes URL address drom .env file, otherwise fallback to localhost
const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";



// use of "regex" (regular expression) tool which can help to manipulate with certain values in strings 
const normalizedBaseURL = baseURL.replace(/\/+$/, "");


const api = axios.create({
    baseURL : normalizedBaseURL,
});

export default api;