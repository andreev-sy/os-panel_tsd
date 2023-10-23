import React from 'react';
import AuthRouter from './view/components/AuthRouter';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {AuthProvider} from './context/AuthContext';

function App() {

    return (
        <AuthProvider>
            <AuthRouter />
        </AuthProvider>
    );
    
}

export default gestureHandlerRootHOC(App);


