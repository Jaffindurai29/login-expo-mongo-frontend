
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';
import { Alert } from 'react-native';

interface AuthContextType {
    userToken: string | null;
    isLoading: boolean;
    isSplashLoading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    register: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isSplashLoading, setIsSplashLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check for stored token on app start
        const bootstrapAsync = async () => {
            let token: string | null = null;
            try {
                token = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                console.error('Restoring token failed', e);
            }
            setUserToken(token);
            setIsSplashLoading(false);
        };

        bootstrapAsync();
    }, []);

    const login = async (email: string, pass: string) => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password: pass });

            const { access_token } = response.data;
            if (access_token) {
                await SecureStore.setItemAsync('userToken', access_token);
                setUserToken(access_token);
            } else {
                throw new Error("No token received");
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert('Login Failed', error.response?.data?.message || error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, pass: string) => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/signup', { email, password: pass });

            Alert.alert('Success', 'Account created! Please login.');
            // Optionally auto-login here
        } catch (error: any) {
            console.error(error);
            Alert.alert('Registration Failed', error.response?.data?.message || error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await SecureStore.deleteItemAsync('userToken');
            setUserToken(null);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ userToken, isLoading, isSplashLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
