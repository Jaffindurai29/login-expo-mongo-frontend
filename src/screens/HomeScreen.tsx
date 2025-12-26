
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
    const { logout } = useContext(AuthContext)!;

    return (
        <View className="flex-1 bg-slate-900 items-center justify-center px-6">
            <Text className="text-3xl font-bold text-white mb-4">Welcome Home!</Text>
            <Text className="text-slate-400 text-center mb-8">
                You have successfully logged in using your MongoDB credentials.
            </Text>

            <TouchableOpacity
                onPress={logout}
                className="bg-rose-600 py-3 px-8 rounded-xl shadow-lg shadow-rose-600/30"
            >
                <Text className="text-white font-bold text-lg">Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
