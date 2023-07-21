import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { auth , googleProvider} from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);

    const signIn = async (event) => {
        event.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password).then(
                function (){
                    if (auth.currentUser){
                        setEmail('');
                        setPassword('');
                        navigate("/home");
                    }
                }
            )
        } catch (err){
            if (err.code === "auth/invalid-email"){
                displayError("Your email is not valid.");
            }
            else if (err.code === "auth/missing-password"){
                displayError("You have not filled in a password.");
            }
            else if (err.code === "auth/wrong-password"){
                displayError("The email-password pair is wrong.");
            }
            else if (err.code === "auth/user-not-found"){
                displayError("The email is not linked to a user.");
            }
            else{
                console.error(err.code);
            }
        }
    };
    const signInWithGoogle = async () => {
        await signInWithPopup(auth,googleProvider).then(
            function (){
                if (auth.currentUser){

                    axios.post('/api/registerUserInternally');

                    setEmail('');
                    setPassword('');
                    navigate("/home");
                }
            }
        )
        .catch(function (err){
            console.log(err)
        });
    };

    function displayError(errorMessage){
        setErrorMessage(errorMessage);
        setErrorMessageVisible(true);
        setTimeout(() => {
            setErrorMessageVisible(false)
        }, 5000);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className='bg-gray-800 h-full w-full'>
            <p className='pt-10 h-32 w-60 m-auto font-semibold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500'>Eventify</p>
            <div className='relative border-2 border-gray-600 xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-3/4 h-3/4 m-auto bg-gray-700 rounded-md text-white'>
                <div className='my-10 mx-20'>
                    <form onSubmit={signIn}>
                        <div className='flex flex-col'>
                            <label className='mb-2 text-lg' htmlFor="email">Email:</label>
                            <input
                                className='bg-gray-800 rounded-sm mb-2 px-2 py-1'
                                type="text"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='mb-2 text-lg' htmlFor="password">Password:</label>
                            <input
                                className='bg-gray-800 rounded-sm mb-2 px-2 py-1'
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button className="float-right mt-5 py-2 px-6 rounded-lg bg-gray-900 hover:bg-gray-800" type="submit">Login</button>
                    </form>
                    <button className='flex mt-20 mx-auto p-2 hover:bg-gray-600 justify-center items-center' onClick={signInWithGoogle}>
                        <img className='w-4 mr-2' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                        <p>Sign in with google</p>
                    </button>
                    <div className='absolute bottom-10'>
                        <a className='text-blue-200 underline m-auto text-center' href='/register'>Or Click Here To Register!</a>
                    </div>
                    <div className={`absolute bottom-40 ease-in-out duration-500 ${errorMessageVisible ? "opacity-100 animate-jump" : "opacity-0"}`}>
                        <p className='text-red-400'>{errorMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}