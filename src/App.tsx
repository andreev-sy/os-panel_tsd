import React from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import AuthRouter from './view/components/AuthRouter';
import {AuthProvider} from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <AuthRouter/>
        </AuthProvider>
    );
}

export default gestureHandlerRootHOC(App);