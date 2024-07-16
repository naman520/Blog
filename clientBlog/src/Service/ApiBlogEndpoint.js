import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:3000/',
    headers:{
        'Content-Type': 'application/json'
    }
})

export const get = (url) => instance.get(url)
export const post = (url,data) => instance.post(url,data)