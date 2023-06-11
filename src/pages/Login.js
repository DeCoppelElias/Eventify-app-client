import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        localStorage.setItem('token', null);

        const login = {
            username : username,
            password : password
        }

        // Perform login logic here with username and password
        // For this example, let's just log the credentials to the console
        axios.post("/api/log-in", login)
        .then(response => {
            //get token from response
            const token = response.data.token;
            const userId = response.data.userId;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
        
            //redirect user to home page
            navigate('/home');
            })
        .catch(function (error) {
            if (error.response) {
                console.log(error);
            }})
            
        // Clear the input fields
        setUsername('');
        setPassword('');
    };

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
            />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
            />
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    );
}