# Login App Frontend

This is the mobile frontend for the Login App, built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev).
It connects to a NestJS backend and uses MongoDB for data storage.

## Features

- **Authentication**: User login and registration.
- **Secure Storage**: JWT tokens are securely stored using `expo-secure-store`.
- **Navigation**: Uses `@react-navigation/native` for screen transitions.
- **Styling**: Styled with `nativewind` (Tailwind CSS for React Native).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/client) app on your iOS or Android device (for physical device testing) or an Emulator/Simulator.

## Getting Started

1.  **Clone the repository** (if you haven't already).

2.  **Install dependencies**:

    ```bash
    cd login-expo-mongo-frontend
    npm install
    ```

3.  **Environment Setup**:

    Copy the example environment file and configure it:

    ```bash
    cp .env.example .env
    ```

    Update `API_URL` in `.env` to point to your backend.
    
    > **Note for Android Emulators**: Use `http://10.0.2.2:3000` instead of `localhost` to access the backend running on your host machine.
    > **Note for Physical Devices**: Use your computer's local IP address (e.g., `http://192.168.1.5:3000`).

4.  **Run the app**:

    ```bash
    npx expo start
    ```

    - Press `a` to open in Android Emulator.
    - Press `i` to open in iOS Simulator (macOS only).
    - Scan the QR code with the **Expo Go** app on your physical device.

## Scripts

- `npm start`: Start the Expo development server.
- `npm run android`: Start on Android Emulator.
- `npm run ios`: Start on iOS Simulator.
- `npm run web`: Start on Web.
- `npm run lint`: Run ESLint and Prettier check.
- `npm run format`: Fix linting errors and format code.

## Tech Stack

- **Framework**: Expo / React Native
- **Navigation**: React Navigation
- **State/HTTP**: Axios, React Hooks
- **Styling**: NativeWind
- **Storage**: Expo Secure Store
