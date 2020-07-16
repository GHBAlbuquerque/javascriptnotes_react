import axios from 'axios';

const Api = axios.create({baseURL: process.env.REACT_APP_BASE_API})
// toda cjamada que eu fizer usando o axios injetará essa URL antes
//ai se essa url mudar, só preciso mudar aqui

export default Api;