import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login(props) {
    const [show, setShow] = useState(false);

    async function checkUser(event) {
        event.preventDefault();
        
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        try {
            const response = await axios.post('https://mira-js.onrender.com/api/user/login', {
                username: username,
                password: password
            });
           
            if (response.data.token) {
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username',username)
                
                // Optionally pass this to the parent component
                props.setLog(true);

                
            } else {
                alert('Failed to Sign up.');
            }
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    }

    return (
        <div className="login">
           
            <div className="login-form">
                <h1 className="text-center text-3xl mb-4">Sign-In</h1>
                
                <input type="text" name="username" id="username" className="login-text focus:outline-none focus:ring-2 focus:ring-[#b76e79]" placeholder="Username" />

                <div className="password-input-wrapper">
                    <input
                        type={show ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className="login-text focus:outline-none focus:ring-2 focus:ring-[#b76e79]"
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShow(!show)}
                    >
                        {show ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="size-6 icon"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="size-6 icon"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                <button type="submit" className="button-login" onClick={checkUser}>
                    Login
                </button>

                <h4 className='text-center' >Dont have an account?</h4>
                <Link to={`/signup`}>

                <p className='text-[#428dd8] text-center cursor-pointer text-lg ' >Signup</p>

                </Link>
                
                
            </div>
        </div>
    );
}
