import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserId, getUserToken } from "./config/firebase";

export function useAxiosNavigation() {
    // Use useRef to prevent a re-render in the useEffect.
    // A ref, cannot be used as a useEffect dependency, hence,
    // your linters shouldn't complain about missing dependencies.
    const navRef = useRef(useNavigate());

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            switch (error?.response?.status) {
                case 400:
                    navRef.current('/login');
                    break;
                case 401:
                    navRef.current('/login');
                    break;
                default:
            }
        }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);
    
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
        async (config) => {
            const token = await getUserToken();
            const userId = await getUserId();
            config.headers['Authorization'] = `Bearer ${token}`;
            config.params = {...config.params, userId: userId};
            return config;
        },
        (error) => {
            console.log("failed to add token")
            return Promise.reject(error);
        }
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);
}

export default function AxiosNavigation() {
  useAxiosNavigation();
  return <></>;
}