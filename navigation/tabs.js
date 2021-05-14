import  React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from '../src/DetailScreen';
import HomeScreen from '../src/HomeScreen';
import SearchScreen from '../src/SearchScreen';
import StateScreen from '../src/StateScreen';
import { Dimensions, StyleSheet, Text, View  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Colors } from '../src/color'
import {Block, Button} from '../src/components';
import WorldScreen from '../src/WorldScreen';
import WorldInfoScreen from '../src/WorldInfoScreen';
const W = Dimensions.get("window").width
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const World = createStackNavigator();
const MainStackNavigator = ({navigation}) => {
     return (
    <Stack.Navigator
    screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blue, 
          shadowColor:Colors.blue,
          elevation: 0, 
        },
      }}>
         <Stack.Screen name="Home" component={HomeScreen} initialParams={{city:"India"}}
         options={{ 
    title: null,
    headerRight: () => (
      <Block style={{flexDirection: 'row', marginRight:moderateScale(10)}}>
          <Button onPress={()=> navigation.navigate('Search')}><Feather name="search" color={Colors.white} size={scale(30)} /></Button>
      </Block>
    ),
  }}/>
         <Stack.Screen name="State" component={StateScreen} 
          options={{
            title: null,
            headerLeft: ()=> ( 
              <Block style={{flexDirection: 'row', marginLeft: moderateScale(10)}}>
                  <Button onPress={ () => { navigation.navigate('Home') }}><Feather name="arrow-left" color={Colors.white} size={scale(30)} /></Button>
              </Block>),
            headerRight: () => (
              <Block style={{flexDirection: 'row', marginRight: moderateScale(10)}}>
                  <Button onPress={()=> navigation.navigate('Search')}><Feather name="search" color={Colors.white} size={scale(30)} /></Button>
              </Block>
            ),
          }}/>
       </Stack.Navigator>
     );
};
const WorldStackNavigator = ({navigation}) => {
    return (
<Stack.Navigator
screenOptions={{
  headerStyle: {
    backgroundColor: Colors.blue, 

    shadowColor:Colors.blue,
    elevation: 0, 
  },
}}>
<Stack.Screen
  name="World"
  component={WorldScreen}
  options={{
    title: null,
    headerRight: () => (
      <Block style={{flexDirection: 'row', marginRight: moderateScale(10)}}>
          <Button onPress={()=> navigation.navigate('Search')}><Feather name="search" color={Colors.white} size={scale(30)} /></Button>
      </Block>
    ),
  }}
/>
<Stack.Screen
  name="WorldInfo"
  component={WorldInfoScreen}
  options={{
    title: null,
    headerLeft: ()=> ( 
      <Block style={{flexDirection: 'row', marginLeft: moderateScale(10)}}>
          <Button onPress={ () => { navigation.navigate('World') }}><Feather name="arrow-left" color={Colors.white} size={scale(30)} /></Button>
      </Block>),
    headerRight: () => (
      <Block style={{flexDirection: 'row', marginRight:moderateScale(10)}}>
          <Button onPress={()=> navigation.navigate('Search')}><Feather name="search" color={Colors.white} size={scale(30)} /></Button>
      </Block>
    ),
  }}
/>
</Stack.Navigator>
    );
};
const DetailStackNavigator = ({navigation}) => {
    return (
<Stack.Navigator
screenOptions={{
  headerStyle: {
    backgroundColor: Colors.blue, 

    shadowColor:Colors.blue,
    elevation: 0, 
  },
}}>
<Stack.Screen
  name="Detail"
  component={DetailScreen}
  options={{
    title: null,
    headerRight: () => (
      <Block style={{flexDirection: 'row', marginRight: moderateScale(10)}}>
          <Button onPress={()=> navigation.navigate('Search')}><Feather name="search" color={Colors.white} size={scale(30)} /></Button>
      </Block>
    ),
  }}
/>
</Stack.Navigator>
    );
};
const tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel:false,
                style:{
                    position:'absolute',
                    bottom:verticalScale(25),
                    left:moderateScale(20),
                    right:moderateScale(20),
                    elevation:scale(0),
                    backgroundColor:'#fff',
                    borderRadius:scale(20),
                    height:verticalScale(70),
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="root" component={MainStackNavigator} options={{
                tabBarIcon:({focused}) => (
                    <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                marginTop: verticalScale(20)}}>
                          <Feather name="home" size={scale(25)} style={{
                              color: focused ? '#3B00AB':'black'
                          }} />
                          <Text style={{
                              color: focused ? '#3B00AB':'black',
                              fontSize:scale(13)
                          }}>Home</Text>
                    </View>
                )
            }}/>
              <Tab.Screen name="Worldroot" component={WorldStackNavigator} options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems:'center',justifyContent:'center',marginTop: verticalScale(20)}}>
                          <Feather name="globe" size={scale(25)} style={{
                              color: focused ? Colors.blue:'black'
                          }} />
                          <Text style={{
                              color: focused ? Colors.blue:'black',
                              fontSize:scale(13)
                          }}>World</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Detail" component={DetailStackNavigator} options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems:'center',justifyContent:'center',marginTop: verticalScale(20)}}>
                          <Feather name="info" size={scale(25)} style={{
                              color: focused ? Colors.blue:'black'
                          }} />
                          <Text style={{
                              color: focused ? Colors.blue:'black',
                              fontSize:scale(13)
                          }}>Detail</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems:'center',justifyContent:'center',marginTop: verticalScale(20)}}>
                          <Feather name="search" size={scale(25)} style={{
                              color: focused ? Colors.blue:'black'
                          }} />
                          <Text style={{
                              color: focused ? Colors.blue:'black',
                              fontSize:scale(13)
                          }}>Search</Text>
                    </View>
                )
            }}/>
        
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:scale(0),
            height:scale(10),
        },
        shadowOpacity:scale(0.25),
        shadowRadius:scale(3.5),
        elevation:scale(5)
    }
})
export default tabs
