import React from 'react';
import RouterComponent from './view/components/AuthRouter';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {AuthProvider} from './context/AuthContext';

function App() {

    return (
        <AuthProvider>
            <RouterComponent />
        </AuthProvider>
    );
    
}

export default gestureHandlerRootHOC(App);


