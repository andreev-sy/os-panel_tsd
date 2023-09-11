import React from 'react';
import RouterComponent from './view/components/AuthRouter';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

function App() {
    return (
        <RouterComponent />
    );
}

export default gestureHandlerRootHOC(App);


