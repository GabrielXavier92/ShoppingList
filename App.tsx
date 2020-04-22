import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';

import { Root } from "native-base";
import { AppLoading } from 'expo';

import * as Font from 'expo-font';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./src/config/apolloServer";
import { Routes } from "./src/routes";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  }


  useEffect(() => { loadFonts() }, [])
  
  if (!isReady) return <AppLoading />
  if (isReady) return (
    <Root>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ApolloProvider>
    </Root>
  );
}
