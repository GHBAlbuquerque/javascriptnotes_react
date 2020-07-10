import axios from 'axios';

const Api = axios.create({baseURL: "http://localhost:3001"})
// toda cjamada que eu fizer usando o axios injetará essa URL antes
//ai se essa url mudar, só preciso mudar aqui

export default Api;