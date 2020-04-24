import React, {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const Login = props => {
    const [credentials, setCredentials] = useState({});

    const login = e =>{
        e.preventDefault();
        axiosWithAuth()
            .post('/api/login', credentials)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', JSON.stringify(res.data.payload));
                props.history.push('/jokes');
            })
            .catch(err => console.log(err.response))
    };

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        //console.log(credentials)
    };

    return (
        <form onSubmit={login}>
            Username:<input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
            />Password:
            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
            />
            <button type="submit">Sign in</button>
        </form>
    )
}