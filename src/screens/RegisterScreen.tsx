
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, isLoading } = useContext(AuthContext)!;

    const handleRegister = async () => {
        try {
            await register(email, password);
            // Navigation is optional here if you auto-login or want them to login manually.
            // For now, let's keep them on this screen or move to login?
            // Context implementation shows an Alert "Success" -> "Please login", so we should navigate to Login.
            navigation.navigate('Login');
        } catch (e) {
            // handled in context
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-slate-900 justify-center px-6"
        >
            <View>
                <Text className="text-4xl font-extrabold text-white text-center mb-2 tracking-wider">
                    Create Account
                </Text>
                <Text className="text-slate-400 text-center mb-10 text-lg">
                    Join us and start your journey
                </Text>

                <View className="space-y-4">
                    <View>
                        <Text className="text-slate-400 mb-2 ml-1 text-sm font-medium uppercase tracking-wide">Email</Text>
                        <TextInput
                            className="w-full bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 focus:border-emerald-500"
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
                            className="w-full bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 focus:border-emerald-500"
                            placeholder="Create a strong password"
                            placeholderTextColor="#64748b"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleRegister}
                    className="w-full bg-emerald-600 mt-8 p-4 rounded-2xl items-center shadow-lg shadow-emerald-500/30"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-bold text-lg">Sign Up</Text>
                    )}
                </TouchableOpacity>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-slate-400">Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="text-emerald-400 font-bold">Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
