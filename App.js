import 'react-native-gesture-handler';
import  React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import OnbordingScreen from './src/OnbordingScreen';
import AsyncStorage from '@react-native-community/async-storage'
import Tabs from './navigation/tabs'
import RNBootSplash from "react-native-bootsplash";
const AppStack = createStackNavigator();
const App = () => {
  const [isFirstLaunch,setIsFirstLaunch] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value=> {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    })
  },[]);
  if( isFirstLaunch === null){
    return null;
  }else if( isFirstLaunch === true){
    return (
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Onbording" component={OnbordingScreen} />
        <AppStack.Screen name="home" component={Tabs}/>
      </AppStack.Navigator>
    </NavigationContainer>
    )
  }
  else{
    return (
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <Tabs/>
      </NavigationContainer>
    
    )
  }
};

export default App;