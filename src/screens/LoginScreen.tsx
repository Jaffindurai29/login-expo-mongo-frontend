
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useContext(AuthContext)!;

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (e) {
            // Error is handled in context
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-slate-900 justify-center px-6"
        >
            <View>
                <Text className="text-4xl font-extrabold text-white text-center mb-10 tracking-wider">
                    Welcome Back
                </Text>

                <View className="space-y-4">
                    <View>
                        <Text className="text-slate-400 mb-2 ml-1 text-sm font-medium uppercase tracking-wide">Email</Text>
                        <TextInput
                            className="w-full bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 focus:border-indigo-500"
                            placeholder="name@example.com"
                            placeholderTextColor="#64748b"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View>
                        <Text className="text-slate-400 mb-2 ml-1 text-sm font-medium uppercase tracking-wide">Password</Text>
                        <TextInput
                            className="w-full bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 focus:border-indigo-500"
                            placeholder="Your password"
                            placeholderTextColor="#64748b"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    className="w-full bg-indigo-600 mt-8 p-4 rounded-2xl items-center shadow-lg shadow-indigo-500/30"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-bold text-lg">Sign In</Text>
                    )}
                </TouchableOpacity>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-slate-400">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text className="text-indigo-400 font-bold">Create account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
