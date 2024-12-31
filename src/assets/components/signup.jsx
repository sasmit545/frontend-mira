import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './log.css'
                

export default function Signup() {
    const navigate= useNavigate()
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [accountcreated,setAccountcreated]=useState(false)
    
    async function checkUser(event) {
        event.preventDefault();
        setLoading(true);
        setError('');

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        

        try {
            const response = await axios.post('https://mira-js.onrender.com/api/user/create', {
                username: username,
                password: password
            });
            console.log(response)
            if (response.data.message==='OK') {

                setAccountcreated(true)

                setTimeout(() => {
                    navigate('/');
                }, 2000);
                
                
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.log(error)
            setError('Error: ' + error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login relative flex flex-col items-center justify-center h-screen">
  

           

            <div className="login-form ">
            {
                        accountcreated?<h1 className='text-green-400 text-center text-xl'>Account created</h1>:<></>
                    }
                <h1 className="text-center text-3xl font-semibold mb-6">Sign-Up</h1>

                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                <form onSubmit={checkUser} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="login-text border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b76e79]"
                        placeholder="Username"
                        aria-label="Username"
                        required
                    />

                    <div className="relative">
                        <input
                            type={show ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className="login-text border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#b76e79]"
                            placeholder="Password"
                            aria-label="Password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={() => setShow(!show)}
                            aria-label={show ? "Hide password" : "Show password"}
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

                    <button
                        type="submit"
                        className="button-sign  bg-[#a7646e] text-white py-2 rounded-md hover:bg-blue-500 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Signup'}
                    </button>
                    
                </form>
            </div>
        </div>
    );
}
