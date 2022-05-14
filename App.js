import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation'

import MyProvider from './src/Contexts/MyProvider'

const App = () => {
  return (


    <MyProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </MyProvider>

  );
};


export default App