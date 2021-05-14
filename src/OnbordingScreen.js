import React from 'react'
import { View, Text,Button, TouchableOpacity } from 'react-native'
import Onbording from 'react-native-onboarding-swiper'

const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';
    return (
        <View 
        style={{
            width:5,
            height:5,
            marginHorizontal:3,
            backgroundColor
        }}
        />
    )
}
const Skip = ({...props}) => (
    <Button
    title="Skip"
    color ="green"
    {...props}
    />
)
const Next = ({ ...props}) => (
    <Button
    title="Next"
    color ="#000000"
    { ...props}
    />
)
const Done = ({ ...props}) => (
    <TouchableOpacity 
    style={{marginHorizontal:10}}
    {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
   
)
const OnbordingScreen = ({navigation}) => {
    return (
        <Onbording
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("home")}
        onDone={() => navigation.replace("home")}
        pages={[
            {
                backgroundColor:'#fff',
                title:'Onbording',
                subtitle:'Done with React Native Onbording Swiper'
            },
            {
                backgroundColor:'#fff',
                title:'Onbording 2',
                subtitle:'Done with React Native Onbording Swiper'
            },
            {
                backgroundColor:'red',
                title:'Onbording 3',
                subtitle:'Done with React Native Onbording Swiper'
            }
        ]}
        />
    )
}

export default OnbordingScreen
 