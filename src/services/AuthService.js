import baseApi from './api';

const AuthService = async (username, password)=> {
 const api = baseApi();
     const result = await api.post(`https://frontend-test-api.aircall.io/auth/login`, {username, password});
        return result.data;
    
}

export default AuthService;

