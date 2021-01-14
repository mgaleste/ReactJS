import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e97b4-default-rtdb.firebaseio.com/'
});

export default instance;