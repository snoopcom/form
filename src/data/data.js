import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3010';

const getData = (body) => axios.post('/sign-up', body);

export default getData;
