import React, { useState} from 'react';
import axios from 'axios'
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);

    async function HandleRegister(event){
        event.preventDefault()
        if(password !== repeatPassword){
            displayError("Repeated password is not the same as the initial password.")
            return;
        }

        const username = firstName + " " + lastName;

        const payload = {
            email: email,
            username: username
        }

        await createUserWithEmailAndPassword(auth, email, password).then(function (){
            if (auth.currentUser){
                updateProfile(auth.currentUser, {
                    displayName: username
                }).then(()=>{
                    axios.post('/api/registerUserInternally', payload)
                    .then(function(){
                        setEmail('');
                        setPassword('');
                        navigate("/home");
                    })
                    .catch(async function(err){
                        try {
                            await signOut(auth).then(
                                function (){
                                    console.log(auth.currentUser)
                                    if (auth.currentUser === null){
                                        navigate("/login")
                                    }
                                }
                            )
                        } catch (err){
                            console.error(err);
                        }
                    });
                })
            }}
        ).catch(function(err){
            if (err.code === "auth/weak-password"){
                displayError("The password should be at least 6 characters long.");
            }
            else if (err.code === "auth/email-already-in-use"){
                displayError("Your email is already in use.");
            }
            else if (err.code === "auth/missing-password"){
                displayError("You have not filled in a password.");
            }
            else if (err.code === "auth/invalid-email"){
                displayError("Your email is not valid.");
            }
            else{
                console.error(err);
            }
        })
    }

    function displayError(errorMessage){
        setErrorMessage(errorMessage);
        setErrorMessageVisible(true);
        setTimeout(() => {
            setErrorMessageVisible(false)
        }, 5000);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    return (
        <div className='bg-gray-800 h-full w-full'>
            <p className='pt-10 h-32 w-60 m-auto font-semibold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500'>Eventify</p>
            <div className='relative border-2 border-gray-600 xl:w-1/2 lg:w-1/2 md:w-3/4 sm:w-full h-3/4 m-auto bg-gray-700 rounded-md text-white'>
                <div className='my-10 mx-20'>
                    <form onSubmit={HandleRegister}>
                        <div className='flex'>
                            <div className='pr-5 flex flex-col w-1/2'>
                                <label className='mb-2 text-lg' htmlFor="firstName">First Name:</label>
                                <input
                                    className='bg-gray-800 rounded-sm mb-2 px-2 py-1'
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                />
                            </div>
                            <div className='pl-5 flex flex-col w-1/2'>
                                <label className='mb-2 text-lg' htmlFor="lastName">Last Name:</label>
                                <input
                                    className='bg-gray-800 rounded-sm mb-2 px-2 py-1'
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='mb-2 text-lg' htmlFor="email">E-mail:</label>
                            <input
                                className='bg-gray-800 rounded-sm mb-2 px-2 py-1'
                                type="text"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className='flex'>
                            <div className='pr-5 flex flex-col w-1/2'>
                                <label className='mb-2 text-lg' htmlFor="password">Password:</label>
                                <input
                                    className='bg-gray-800 rounded-sm mb-2 px-2 py-1'
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className='pl-5 flex flex-col w-1/2'>
                                <label className='mb-2 text-lg' htmlFor="repeatpassword">Repeat Password:</label>
                                <input
                                    className='bg-gray-800 rounded-sm mb-2 px-2 py-1'
                                    type="password"
                                    id="repeatpassword"
                                    value={repeatPassword}
                                    onChange={handleRepeatPasswordChange}
                                />
                            </div>
                        </div>
                        <button className="float-right mt-5 py-2 px-6 rounded-lg bg-gray-900 hover:bg-gray-800" type="submit">Register</button>
                    </form>
                    <div className='absolute bottom-10'>
                        <a className='text-blue-200 underline m-auto text-center' href='/login'>Or Click Here To Log-In!</a>
                    </div>
                    <div className={`absolute bottom-40 ease-in-out duration-500 ${errorMessageVisible ? "opacity-100 animate-jump" : "opacity-0"}`}>
                        <p className='text-red-400'>{errorMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}